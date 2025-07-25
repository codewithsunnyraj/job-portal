import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const changeEventHandler = (e) => {
    console.log({ ...input }); //Purane values ko copy karo
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log({ ...input });
  };

  const changeFileHandler = async (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false)); 
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex my-32 justify-center items-center">
        <form onSubmit={submitHandler} className="border w-1/2 rounded-lg p-8">
          <div>
            <h4 className="text-2xl text-center font-bold">Sign Up</h4>
          </div>
          <div className="mt-3">
            <Label className="font-bold">FullName</Label>
            <Input
              placeholder="Enter Full Name"
              onChange={changeEventHandler}
              value={input.fullname}
              name="fullname"
              type="text"
            />
          </div>
          <div className="my-4">
            <Label className="font-bold">Email</Label>
            <Input
              placeholder="Enter EmailId"
              onChange={changeEventHandler}
              value={input.email}
              name="email"
              type="email"
            />
          </div>
          <div>
            <Label className="font-bold">Phone Number</Label>
            <Input
              placeholder="Enter Phone Number"
              name="phoneNumber"
              onChange={changeEventHandler}
              value={input.phoneNumber}
              type="text"
            />
          </div>
          <div className="my-4">
            <Label className="font-bold">Password</Label>
            <Input
              placeholder="Enter Password"
              name="password"
              onChange={changeEventHandler}
              value={input.password}
              type="password"
            />
          </div>
          <div>
            <RadioGroup className="flex gap-8">
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "student"}
                  value="student"
                  onChange={changeEventHandler}
                  id="student"
                  className="cursor-pointer w-6 h-6"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recuiter"}
                  value="recuiter"
                  onChange={changeEventHandler}
                  id="recuiter"
                  className="cursor-pointer h-6 w-6"
                />
                <Label htmlFor="recuiter">Recuiter</Label>
              </div>
            </RadioGroup>
            <div className="flex my-4 items-center gap-6">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                onChange={changeFileHandler}
                type="file"
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="mr-4 w-full">
              <Loader2 className="animate-spin" /> Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full cursor-pointer py-3 my-4">
              SignUp
            </Button>
          )}
          <span className="block text-center">
            Already Have an Account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
