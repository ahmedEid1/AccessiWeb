import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import imgLogo from "assets/accessiweb-two.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "provider/useAuth";

interface IFormInput {
  email: string;
  password: string;
}
export const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    login("hello there");
    navigate("/dashboard", { replace: true });
  };
  return (
    <Box className="border rounded-md w-full md:w-1/2 bg-[#F0F8FF] p-2">
      <Box className="flex justify-center mx-auto mt-4">
        <img src={imgLogo} width={200} />
      </Box>

      <Box className="p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <Box className=" ">
            <div className="grid gap-2 my-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
            </div>
            <div className="grid gap-2 my-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <div>
              <Button className="my-2" type="submit">
                Submit
              </Button>
              <Link to={"/signup"} className="mx-2 italic hover:underline">
                or Signup here
              </Link>
            </div>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

// export default Login;
