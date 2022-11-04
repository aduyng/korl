import {
  getAuth,
  onIdTokenChanged,
  signOut as signUserOut,
  User,
} from "firebase/auth";
import getClient from "../firebase/getClient";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";

const AuthContext = createContext<{ user: User | null; signOut: () => void }>({
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
      setUser(fireUser);
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
