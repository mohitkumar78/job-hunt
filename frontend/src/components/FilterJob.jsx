import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuerry } from "../redux/job.slice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterJob = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchQuerry(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-md lg:max-w-[300px]">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">Filter Jobs</h1>
      <hr className="mt-3 mb-5 border-gray-300" />

      {/* Filter Groups */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <h2 className="mb-3 text-lg font-medium text-gray-700">
              {data.filterType}
            </h2>
            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center p-2 space-x-3 transition rounded-md hover:bg-gray-50"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-600 cursor-pointer hover:text-gray-900"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterJob;
