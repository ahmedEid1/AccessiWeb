import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthProtected from "Layout/Authentication";
import ProtectedRoutes from "Layout/Dashboard";
import { History, Home, Profile } from "@pages/Dashboard";
import { Login, Signup } from "@pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthProtected />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "",
        element: <Navigate to="home" />,
      },
    ],
  },
]);

export { router };
