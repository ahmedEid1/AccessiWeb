import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface IFormInput {
  fullname: string;
  email: string;
  password: string;
  cpassword: string;
}

export const Profile = () => {
  const { handleSubmit, register } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <Box className="">
      <Box className="border  rounded-md   md:w-1/2 bg-[#F0F8FF] p-2 mx-4 md:mx-auto my-[100px]">
        <Box className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Box className=" grid md:grid-cols-2 gap-2">
              <div className=" ">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="fullname"
                  value={"Samuel Luminous"}
                  disabled
                  {...register("fullname")}
                />
              </div>
              <div className="  ">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={"sam@lumi.com"}
                  disabled
                  {...register("email")}
                />
              </div>
              {/* <div className=" ">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  disabled
                  {...register("password")}
                />
              </div> */}
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
