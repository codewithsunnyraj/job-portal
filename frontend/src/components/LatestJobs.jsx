import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="bg-home py-8 md:py-10">
      <div className="max-w-7xl mx-auto my-0 md:my-7 ">
        <h1 className="text-4xl font-bold">
          Latest & Top <span className="text-red-500">Job Openings</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-4 my-8">
          {allJobs.length > 0 ? (
            allJobs
              .slice(0, 6)
              .map((jobs, index) => (
                <LatestJobCards key={jobs._id} job={jobs} />
              ))
          ) : (
            <p className="text-red-600  font-bold">No Job Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
