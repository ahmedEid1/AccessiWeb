import { Box, Link, Tooltip } from "@mui/material";
import logo from "assets/accessiweb-two.png";
import { NavLink } from "react-router-dom";
import { Logout, Menu, Close } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "provider/useAuth";
import "./navbar.module.css";
import { useState } from "react";

interface INavItem {
  title: string;
  url: string;
}
const navItems: INavItem[] = [
  {
    title: "Home",
    url: "home",
  },
  { title: "History", url: "history" },
  { title: "Profile", url: "profile" },
];
const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenuOnMobile = () => {
    if (window.innerWidth <= 800) setShowMenu(false);
  };

  return (
    <Box className="fixed top-0 left-0 right-0 z-50 bg-white">
      <nav className="flex justify-between items-center p-4 border inline-block  ">
        <Box className=" w-1/3 ">
          <Link href="/dashboard">
            <img src={logo} width={200} />
          </Link>
        </Box>

        <Box className={`menus ${showMenu ? "show_menu" : ""}`}>
          <ul className="menus__list">
            {navItems.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#5454F6] text-white text-bold  px-4 py-2 rounded-md"
                      : "hover:underline hover:underline-offset-8"
                  }
                  onClick={handleCloseMenuOnMobile}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <Box className="">
            <Tooltip title="Logout">
              <Button onClick={handleLogout}>
                Signout
                <Logout className="ml-2" />
              </Button>
            </Tooltip>
          </Box>

          <Box className="menus__close" onClick={handleToggleMenu}>
            <Tooltip title="close">
              <Close className="cursor-pointer" />
            </Tooltip>
          </Box>
        </Box>

        <Box className="menus__hamburger" onClick={handleToggleMenu}>
          <Menu className="cursor-pointer" />
        </Box>
      </nav>
    </Box>
  );
};

export default NavBar;
