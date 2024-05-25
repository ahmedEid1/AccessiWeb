import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./pages/Authentication/AuthLayout";
import { Login, Signup } from "@pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
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
]);

export { router };
