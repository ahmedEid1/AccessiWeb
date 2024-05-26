import { useAuthContext } from "provider/useAuth";
import { Navigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function AuthProtected() {
  const { token } = useAuthContext();

  return !token ? <AuthLayout /> : <Navigate to="/dashboard" />;
}
