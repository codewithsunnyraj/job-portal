import Job from "@/components/job";
import Navbar from "@/components/shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Browse = () => {
  // const ranJobs = [1, 2, 3, 4];
  useGetAllJobs();
  const dispatch = useDispatch();
  const { allJobs } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-20">
        <div>
          <h1 className="font-bold text-xl">
            Search Results ({allJobs.length})
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {allJobs.map((items, index) => (
            <Job key={items?._id} job={items} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
