import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
const Navbar = () => {
  const user = false;
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
                <Link>Home</Link>
              </li>
              <li>
                <Link>Jobs</Link>
              </li>
              <li>
                <Link>Browse</Link>
              </li>
            </ul>
            <div className="cursor-pointer">
              {user ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="rounded-full">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="skull"
                        className="h-12 w-12 rounded-full"
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-70 py-6 px-4">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="skull"
                          className="h-10 w-10 rounded-full"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">Sunny Raj</h4>
                        <p>Lorem ipsum dolor sit amet.</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        variant="link"
                        className="outline-none border-none"
                      >
                        View Profile
                      </Button>
                    </div>
                    <div>
                      <Button variant="link">Logout</Button>
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
