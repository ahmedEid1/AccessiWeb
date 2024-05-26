import { Button } from "@/components/ui/button";
import { Box } from "@mui/material";
import { useAuthContext } from "provider/useAuth";

export const Home = () => {
  const { logout } = useAuthContext();
  const handleLogout = () => {
    logout();
  };
  return (
    <Box>
      Hello I'm home
      <Box>
        <Button onClick={handleLogout}>Logout</Button>
      </Box>
    </Box>
  );
};
