import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";
import { Button } from "./ui/button";
function Categorycarousel() {
  const Category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "Data Science",
    "Cloud Engineer",
    "Network Engineer",
    "Software Engineer",
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {Category.map((cat, index) => {
        return (
          <Button variant="outline" className="rounded-full">
            {cat}
          </Button>
        );
      })}
    </div>
  );
}

export default Categorycarousel;
