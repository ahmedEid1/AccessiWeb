import { Box, Link } from "@mui/material";
import logo from "assets/accessiweb-two.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Box>
      <nav className="flex text-center items-center p-4 border inline-block">
        <Box className="w-1/3 inline-block  ">
          <Link href="/dashboard">
            <img src={logo} width={200} />
          </Link>
        </Box>

        <Box className="flex justify-end md:justify-center items-center gap-4 flex-grow md:w-1/3 inline-block ">
          <NavLink
            to="home"
            className={({ isActive }) =>
              isActive
                ? "bg-[#5454F6] text-white px-4 py-2 p rounded-md"
                : "hover:underline hover:underline-offset-8"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="history"
            className={({ isActive }) =>
              isActive
                ? "bg-[#5454F6] text-white px-4 py-2 p rounded-md"
                : "hover:underline hover:underline-offset-8"
            }
          >
            History
          </NavLink>
        </Box>

        <Box className="md:w-1/3 "></Box>
      </nav>
    </Box>
  );
};

export default NavBar;
