import { useEffect } from "react";
import { signInAnonymously, getAuth } from "firebase/auth";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../context/Auth";

const Home = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      signInAnonymously(getAuth());
    }
  }, [auth.user]);

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">Home</Typography>
    </Box>
  );
};

export default Home;
