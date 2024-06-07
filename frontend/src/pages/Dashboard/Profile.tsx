import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface IFormInput {
  fullname: string;
  email: string;
}

export const Profile = () => {
  const { register, setValue } = useForm<IFormInput>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          credentials: 'include',  // Include credentials for session-based authentication
        });

        if (response.ok) {
          const data: IFormInput = await response.json();
          setValue('fullname', data.fullname);
          setValue('email', data.email);
          setIsLoading(false);
        } else {
          console.error('Failed to fetch profile data');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [setValue]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="">
      <Box className="border rounded-md md:w-1/2 bg-[#F0F8FF] p-2 mx-4 md:mx-auto">
        <Box className="p-4">
          <form className="space-y-8">
            <Box className="grid md:grid-cols-2 gap-2">
              <div>
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="fullname"
                  disabled
                  {...register("fullname")}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled
                  {...register("email")}
                />
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
