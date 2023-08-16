import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import SideBar from "./SideBar.jsx";
import Dashboard from "../../screens/adminScreens/Dashboard.jsx";

const Home = () => {
  return (
    <>
      <SideBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }}}
        >
          <Toolbar />
          <Dashboard />
        </Box>
      </SideBar>
    </>
  );
};

export default Home;
