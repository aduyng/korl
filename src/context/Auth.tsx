import {
  getAuth,
  onIdTokenChanged,
  signInAnonymously,
  signOut as signUserOut,
  User,
} from "firebase/auth";
import getClient from "../firebase/getClient";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

export type LoggedInUser = User & {
  isAdmin: boolean;
};

const AuthContext = createContext<{
  user: LoggedInUser | null;
  signOut: () => void;
}>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = () => {
    signUserOut(getAuth());
    setUser(null);
  };

  useEffect(() => {
    getClient();
    return onIdTokenChanged(getAuth(), async (fireUser) => {
      if (!fireUser) {
        setUser(null);
        setLoading(false);
        return;
      }
      setUser({
        ...fireUser,
        isAdmin: [
          "MNCIt42R24WNRBM4YDMgNs82aL92", // Macbook Pro - Chrome
          "Y5pj0CEQkzWzvHxNJ0pz6Q2yTyo1", // Pixel 9 Fold - Chrome
        ].includes(fireUser.uid),
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    }, 10 * 1000);
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    if (!user) {
      signInAnonymously(getAuth());
    }
  }, [user]);

  if (loading) {
    return <Loader center />;
  }
  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
