import { Badge } from "@/components/ui/badge";
import React from "react";

const LatestJobCards = () => {
  return (
    <div className="border p-5">
      <div>
        <h4 className="font-semibold text-xl">Company Name</h4>
        <p className="text-gray-400 py-2">India</p>
        <div>
          <h4 className="text-xl my-4 font-bold">Jobs Title</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
            placeat?
          </p>
        </div>
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
    </div>
  );
};

export default LatestJobCards;
