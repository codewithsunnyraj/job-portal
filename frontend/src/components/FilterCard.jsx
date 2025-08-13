import { setSearchQuery } from "@/redux/jobSlice";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
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
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div>
      <div className="">
        <h1>Filter Jobs</h1>
        <hr className="mt-2 mb-4 bg-slate-500 h-[2px]" />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {filterData.map((items, index) => (
            <div>
              <h1 className="font-semibold text-xl">{items.filterType}</h1>
              {items.array.map((item, idx) => {
                const itemId = `r${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2 my-2">
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="cursor-pointer border border-slate-600"
                    />
                    <Label htmlFor={itemId} className="cursor-pointer">
                      {item}
                    </Label>
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
