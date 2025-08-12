import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import store from "@/redux/store";

const LatestJobs = () => {
  const { allJobs ,} = useSelector((store) => store.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        Latest & Top <span className="text-red-500">Job Openings</span>
      </h1>
      <div className="grid grid-cols-3 gap-4 my-8">
        {allJobs.length > 0
          ? allJobs
              .slice(0, 6)
              .map((jobs, index) => (
                <LatestJobCards
                  key={jobs._id}
                  job={jobs}
                />
              ))
          : "No Job Found"}
      </div>
    </div>
  );
};

export default LatestJobs;
