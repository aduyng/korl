import { FC, ReactNode } from "react";
import { Box } from "@mui/material";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        minHeight: "100vh",
        maxWidth: "100vw",
        flexGrow: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default Layout;
