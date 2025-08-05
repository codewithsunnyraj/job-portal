import FilterCard from "@/components/FilterCard";
import Job from "@/components/job";
import Navbar from "@/components/shared/Navbar";
import store from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
const Jobs = () => {
  // const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const { allJobs } = useSelector((store) => store.job);
 
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl my-20 mx-auto container">
        <div className="flex gap-8">
          {/* Filter left */}
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {/* Jobs Card */}
          <div className="w-full">
            {allJobs.length <= 0 ? (
              <span>Job Not Found</span>
            ) : (
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
                <div className="grid grid-cols-3 gap-8">
                  {allJobs.map((items, index) => (
                    <div>
                      <Job jobs={items} key={items?._id} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
