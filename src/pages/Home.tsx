import { useEffect } from "react";
import { signInAnonymously, getAuth } from "firebase/auth";
import { useAuth } from "../context/Auth";
import Content from "./Home/Content";

const Home = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      signInAnonymously(getAuth());
    }
  }, [auth.user]);

  return <Content />;
};

export default Home;
