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
    <div className="flex items-center justify-center gap-3">
      {Category.map((cat, index) => {
        return (
          <Button
            key={index}
            onClick={() => searchHandler(cat)}
            variant="outline"
            className="rounded-full"
          >
            {cat}
          </Button>
        );
      })}
    </div>
  );
}

export default Categorycarousel;
