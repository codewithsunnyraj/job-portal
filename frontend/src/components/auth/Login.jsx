import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div>
      <Navbar />
      <div className="flex my-32 justify-center items-center">
        <form className="border w-1/2 rounded-lg p-8">
          <div>
            <h4 className="text-2xl text-center font-bold">Login</h4>
          </div>
          <div className="my-4">
            <Label className="font-bold">Email</Label>
            <Input placeholder="Enter EmailId" type="email" />
          </div>

          <div className="my-4">
            <Label className="font-bold">Password</Label>
            <Input placeholder="Enter Password" type="password" />
          </div>
          <div>
            <RadioGroup className="flex mt-8 mb-5 gap-8">
              <div className="flex gap-2 items-center">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  id="student"
                  className="cursor-pointer w-6 h-6"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  type="radio"
                  name="role"
                  value="recuiter"
                  id="recuiter"
                  className="cursor-pointer h-6 w-6"
                />
                <Label htmlFor="recuiter">Recuiter</Label>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full py-3 my-4">
            Login
          </Button>
          <span>
            No Account<Link to="/signup">SignUp</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
