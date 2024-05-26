import NavBar from "@components/NavBar";
import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <Box>Dashboard</Box>
      <Box>
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout;
