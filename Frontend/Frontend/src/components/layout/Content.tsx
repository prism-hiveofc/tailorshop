import { useState } from "react";
import { Box } from "@mui/material";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Content = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAFAFC" }}>
      <Header onMenuClick={handleMenuClick} />

      <Box sx={{ display: "flex" }}>
        <Sidebar
          mobileOpen={mobileOpen}
          onMobileClose={handleMobileClose}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            pt: { xs: "60px", sm: "64px", md: "68px" },
          }}
        >
          {/* page content */}
        </Box>
      </Box>
    </Box>
  );
};

export default Content;