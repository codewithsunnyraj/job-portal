import Job from "@/components/job";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Browse = () => {
  const ranJobs = [1, 2, 3, 4];
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-20">
        <div>
          <h1 className="font-bold text-xl">
            Search Results ({ranJobs.length})
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {ranJobs.map((items, index) => (
            <Job />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
