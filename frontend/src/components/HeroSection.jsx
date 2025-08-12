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
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="container mx-auto max-w-3xl">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <p className="py-1 px-3 text-red-700 bg-slate-300 rounded-full inline-block">
            No. 1 Job Hunt Website
          </p>
        </div>
        <div className="flex justify-center my-8">
          <div>
            <h1 className="text-6xl max-w-3xl font-semibold">
              Search, Apply & Get Your{" "}
              <span className="text-blue-900">Dream Jobs</span>
            </h1>
            <p className="my-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              officia harum qui rem cupiditate eveniet nobis, porro, quae,
            </p>
            <div className="bg-black rounded-full border border-black/20  flex items-center ">
              <input
                type="text"
                name="search"
                onChange={(e) => setQuery(e.target.value)}
                className="bg-white py-2 w-[90%] rounded-l-full ps-3"
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
  );
};

export default HeroSection;
