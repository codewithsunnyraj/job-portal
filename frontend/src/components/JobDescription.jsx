import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div className="my-16 mx-auto max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl my-4">Title</h1>
          <div className="flex gap-4 my-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              12 positions
            </Badge>
            <Badge className="text-red-700 font-bold" variant="ghost">
              Part Time
            </Badge>
            <Badge className="text-green-700 font-bold" variant="ghost">
              24 LPA
            </Badge>
          </div>
        </div>
        <div>
          {isApplied ? (
            <Button
              disabled={isApplied}
              className="disabled:bg-gray-600 cursor-not-allowed"
            >
              Already Applied
            </Button>
          ) : (
            <Button className="bg-red-500 ">Apply Now</Button>
          )}
        </div>
      </div>
      <div className="my-5">
        <h1 className="font-bold border-b-2 pb-3 border-b-gray-400">
          Job Descriptions
        </h1>
      </div>
      <div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Role:</h5>
          <span>Frontend Devbelope</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Location:</h5>
          <span>Hydrabad</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Description:</h5>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
            temporibus.
          </span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Experience</h5>
          <span>2 Yrs</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Salary:</h5>
          <span>12 LPA</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Total Applicants</h5>
          <span>4</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Posted Date:</h5>
          <span>Frontend Devbeloper</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
