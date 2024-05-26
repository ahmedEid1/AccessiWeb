import { createBrowserRouter } from "react-router-dom";
import AuthProtected from "Layout/Authentication";
import ProtectedRoutes from "Layout/Dashboard";
import { Home } from "@pages/Dashboard";
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
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export { router };
