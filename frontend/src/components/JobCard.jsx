import React from "react";
import { Badge } from "./ui/badge";
function JobCard() {
  return (
    <div className="p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer">
      <div>
        <h1>Company Name</h1>
        <p>India</p>
      </div>
      <diV>
        <h1>Job Title</h1>
        <p>Lorem ipsum dolor sit amet consectetur.lorem7</p>
      </diV>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          12 Postions
        </Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">
          Part Time
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          24 LPA
        </Badge>
      </div>
    </div>
  );
}

export default JobCard;
