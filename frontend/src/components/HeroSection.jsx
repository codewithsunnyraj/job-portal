import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    console.log(query);
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="w-full">
      <div className="container mx-auto mt-10 md:mt-48 max-w-3xl">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <p className="py-1 px-6 text-red-700 bg-slate-200/50 rounded-full inline-block">
              No. 1 Job Hunt Website
            </p>
          </div>
          <div className="flex justify-center my-8">
            <div>
              <h1 className="text-6xl max-w-3xl font-semibold">
                Search, Apply & Get Your{" "}
                <span className=" bg-gradient-to-r font-bold mt-3 inline-block bg-clip-text text-transparent from-indigo-500 via-purple-500 to-pink-500 ">
                  Dream Jobs
                </span>
              </h1>
              <p className="my-4">
                Landing your dream job starts with a smart search. Use reliable
                job portals, company websites, and networking platforms like
                LinkedIn to find roles that align with your skills and career
                goals.
              </p>
              <div className="bg-black rounded-full border border-black/20  flex items-center ">
                <input
                  type="text"
                  name="search"
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-white py-2 w-[90%]  rounded-l-full ps-3"
                  placeholder="Find Your Dream Jobs"
                />
                <Button onClick={searchJobHandler} className="rounded-r-full ">
                  <FaMagnifyingGlass className="text-white ml-4 " />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
