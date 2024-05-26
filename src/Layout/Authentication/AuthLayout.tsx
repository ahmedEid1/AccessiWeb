import { Box } from "@mui/material";
import { Outlet } from "react-router";
import accessLog from "assets/accessiweb-two.png";

export default function AuthLayout() {
  return (
    <Box className="layout">
      <Box className="box1">
        <img src={accessLog} />
      </Box>
      <Box className="box2 p-4 border">
        <Outlet />
      </Box>
    </Box>
  );
}
