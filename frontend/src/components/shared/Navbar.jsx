import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
const Navbar = () => {
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="py-5 w-full ">
      <div className="container mx-auto">
        <div className="flex justify-between ">
          <div>
            <h5 className="text-3xl font-bold">
              Job <span className="text-red-500">Portal</span>
            </h5>
          </div>
          <div className="flex items-center gap-6">
            <ul className="space-x-3 flex text-xl font-semibold">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/jobs">Jobs</Link>
              </li>
              <li>
                <Link to="/browse">Browse</Link>
              </li>
            </ul>
            <div className="cursor-pointer">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="rounded-full">
                      <AvatarImage
                        src={
                          user.profile.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt="skull"
                        className="h-12 w-12 rounded-full"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-70 py-6 px-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            user.profile.profilePhoto ||
                            "https://github.com/shadcn.png"
                          }
                          alt="skull"
                          className="h-10 w-10 rounded-full"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">
                          {user?.fullname || ""}
                        </h4>
                        <p>{user?.bio || ""}</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        className="outline-none border-none"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                    <div>
                      <Button onClick={logoutHandler} variant="link">
                        <Link to="/logout">Logout</Link>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <div className="flex gap-5">
                  <Link to="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline">Signup</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
