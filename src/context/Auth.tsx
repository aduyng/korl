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
          "d0FH2HnrdyVyZH264A3FA3gdsk82",
          "KxWEWUdZv8Sf6QXn26uK7xqYhEw2",
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
