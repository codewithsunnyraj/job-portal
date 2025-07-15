import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex my-32 justify-center items-center">
        <form className="border w-1/2 rounded-lg p-8">
          <div>
            <h4 className="text-2xl text-center font-bold">Sign Up</h4>
          </div>
          <div className="mt-3">
            <Label className="font-bold">FullName</Label>
            <Input placeholder="Enter Full Name" type="text" />
          </div>
          <div className="my-4">
            <Label className="font-bold">Email</Label>
            <Input placeholder="Enter EmailId" type="email" />
          </div>
          <div>
            <Label className="font-bold">Phone Number</Label>
            <Input placeholder="Enter Phone Number" type="text" />
          </div>
          <div className="my-4">
            <Label className="font-bold">Phone Number</Label>
            <Input placeholder="Enter Password" type="password" />
          </div>
          <div>
            <RadioGroup className="flex gap-8">
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  id="student"
                  className="cursor-pointer w-6 h-6"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center">
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
            <div className="flex my-4 items-center gap-6">
              <Label>Profile</Label>
              <Input accept="image/*" type="file" className="cursor-pointer" />
            </div>
          </div>
          <Button type="submit" className="w-full py-3 my-4">
            SignUp
          </Button>
          <span className="block text-center">
            Already Have an Account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
