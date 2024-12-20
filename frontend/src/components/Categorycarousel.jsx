import React from "react";
import { setSearchQuerry } from "../redux/job.slice";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

function Categorycarousel() {
  const navigate = useNavigate();
  const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Data Science",
    "Cloud Engineer",
    "Network Engineer",
    "Software Engineer",
  ];

  const dispatch = useDispatch();

  const searchHandler = (querry) => {
    dispatch(setSearchQuerry(querry));
    navigate("/browse");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Category.map((cat, index) => (
        <Button
          key={index}
          onClick={() => searchHandler(cat)}
          variant="outline"
          className="px-5 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}

export default Categorycarousel;
