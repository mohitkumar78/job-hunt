import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterJob = () => {
  return (
    <div className="w-full p-3 bg-white rounded-md">
      <h1 className="text-lg font-bold">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {fitlerData.map((data, index) => (
          <div>
            <h1 className="text-lg font-bold">{data.fitlerType}</h1>
            {data.array.map((item, idx) => {
              return (
                <div className="flex items-center my-2 space-x-2">
                  <RadioGroupItem value={item} />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterJob;
