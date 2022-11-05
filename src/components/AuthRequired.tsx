import { ReactNode, useEffect } from "react";
import { signInAnonymously, getAuth } from "firebase/auth";
import { useAuth } from "../context/Auth";
import Loader from "./Loader";

export default function AuthStateRequired({
  children,
}: {
  children: ReactNode;
}) {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      signInAnonymously(getAuth());
    }
  }, [auth.user]);

  if (!auth.user) {
    return <Loader size={40} />;
  }

  return <>{children}</>;
}
