import React from "react";
import { Button } from "./ui/button";
import { FaBookmark } from "react-icons/fa6";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
const Job = ({ jobs }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (monodbTime) => {
    const currentTime = new Date();
    const createdAt = new Date(monodbTime);
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };
  // const jobId = "dfgdfg dfgdfgdg";
  return (
    <div className="p-5 rounded-sm shadow-xl bg-white border-gray-300">
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          {" "}
          {daysAgoFunction(jobs?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(jobs?.createdAt)}  days Ago`}{" "}
        </p>
        <Button className="rounded-full" variant="outline" size="icon">
          <FaBookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://tse2.mm.bing.net/th/id/OIP.5jqrgu6exFLl0bk-hxBdyQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-xl">{jobs.company.name}</h1>
          <p>India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold">{jobs.title}</h1>
        <p className="my-4">{jobs.description}</p>
        <div className="flex gap-4 my-4">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {jobs.position} positions
          </Badge>
          <Badge className="text-red-700 font-bold" variant="ghost">
            {jobs.jobType}
          </Badge>
          <Badge className="text-green-700 font-bold" variant="ghost">
            {jobs.salary} LPA
          </Badge>
        </div>
        <div className="flex justify-between my-5">
          <Button
            onClick={() => navigate(`/description/${jobs._id}`)}
            variant="outline"
            className=""
          >
            Details
          </Button>
          <Button className="bg-black text-white" variant="outline">
            Save For Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Job;
