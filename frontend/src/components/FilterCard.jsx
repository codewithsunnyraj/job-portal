import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Chennai", "Bihar", "Mumbai", "Kolkata"],
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
    },
    {
      filterType: "Salary",
      array: ["0-40k", "42-1Lakh", "1Lakh to 5 Lakh"],
    },
  ];
  return (
    <div>
      <div className="">
        <h1>Filter Jobs</h1>
        <hr className="mt-5" />
        <RadioGroup>
          {filterData.map((items, index) => (
            <div>
              <h1 className="font-semibold text-xl">{items.filterType}</h1>
              {items.array.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2 my-2">
                    <RadioGroupItem value={item} />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
