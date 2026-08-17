import {
  Box,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Header />

      {!isMobile && <Sidebar />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            md: `calc(100% - 240px)`,
          },
          bgcolor: "#f5f7fb",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            maxWidth: 1600,
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>  
  );
};

export default MainLayout;