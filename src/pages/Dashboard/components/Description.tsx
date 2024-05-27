import { Button } from "@/components/ui/button";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface IDescriptionProp {
  text: string;
}
export const Description: React.FC<IDescriptionProp> = ({ text }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast.success("Copied Image Description");
  };
  return (
    <Box className="border shadow my-4 p-3 text-left rounded-lg">
      <Typography variant="body1">{text}</Typography>
      <Box className="text-right mt-2">
        <Button onClick={handleCopy} className="rounded-full px-6">
          Copy
        </Button>
      </Box>
    </Box>
  );
};
