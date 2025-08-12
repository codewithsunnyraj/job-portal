import React, { useEffect, useState } from "react";
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
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader, Loader2 } from "lucide-react";
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading,user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    console.log({ ...input }); //Purane values ko copy karo
    setInput({ ...input, [e.target.name]: e.target.value });
    console.log({ ...input });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex my-32 justify-center items-center">
        <form className="border w-1/2 rounded-lg p-8" onSubmit={submitHandler}>
          <div>
            <h4 className="text-2xl text-center font-bold">Login</h4>
          </div>
          <div className="my-4">
            <Label className="font-bold">Email</Label>
            <Input
              placeholder="Enter EmailId"
              name="email"
              id="email"
              value={input.email}
              onChange={changeEventHandler}
              type="email"
            />
          </div>

          <div className="my-4">
            <Label className="font-bold">Password</Label>
            <Input
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={changeEventHandler}
              value={input.password}
              type="password"
            />
          </div>
          <div>
            <RadioGroup className="flex mt-8 mb-5 gap-8">
              <div className="flex gap-2 items-center">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  id="student"
                  onChange={changeEventHandler}
                  className="cursor-pointer w-6 h-6"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                  id="recruiter"
                  className="cursor-pointer h-6 w-6"
                />
                <Label htmlFor="recruiter">recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="w-full cursor-pointer py-3 my-4">
              Login
            </Button>
          )}

          <span>
            No Account<Link to="/signup">SignUp</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
