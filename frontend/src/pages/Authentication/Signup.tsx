import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import imgLogo from "assets/accessiweb-two.png";
import { Link } from "react-router-dom";

interface IFormInput {
  fullname: string;
  email: string;
  password: string;
  cpassword: string;
}

export const Signup = () => {
  const { handleSubmit, register } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const requestBody = {
      username: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred. Please try again later.');
    }
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
              <Label htmlFor="fullname">Fullname</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="fullname"
                {...register("fullname")}
              />
            </div>
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

            <div className="grid gap-2 my-4">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input
                id="cpassword"
                type="password"
                {...register("cpassword")}
              />
            </div>

            <div>
              <Button className="my-2" type="submit">
                Submit
              </Button>
              <Link to={"/login"} className="mx-2 italic hover:underline">
                or Login here
              </Link>
            </div>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
