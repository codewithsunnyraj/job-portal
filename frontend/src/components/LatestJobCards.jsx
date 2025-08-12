import { Badge } from "@/components/ui/badge";
import React from "react";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="border p-5"
      onClick={() => navigate(`/description/${job?._id}`)}
    >
      <div>
        <h4 className="font-semibold text-xl">{job.company.name}</h4>
        <p className="text-gray-400 py-2">India</p>
        <div>
          <h4 className="text-xl my-4 font-bold">{job.title}</h4>
          <p>{job.description}</p>
        </div>
        <div className="flex gap-4 my-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job.position} positions
          </Badge>
          <Badge className="text-red-700 font-bold" variant="ghost">
            {job.jobType}
          </Badge>
          <Badge className="text-green-700 font-bold" variant="ghost">
            {job.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
