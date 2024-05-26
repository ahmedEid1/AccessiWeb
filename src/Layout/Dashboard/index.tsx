import { useAuthContext } from "provider/useAuth";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

export default function ProtectedRoutes() {
  const { token } = useAuthContext();

  return token ? <DashboardLayout /> : <Navigate to="/login" />;
}
