import NavBar from "@components/NavBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

const DashboardLayout = () => {
  return (
    <div>
      <NavBar />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
      <Box className="mt-[100px]">
        <Outlet />
      </Box>
    </div>
  );
};

export default DashboardLayout;
