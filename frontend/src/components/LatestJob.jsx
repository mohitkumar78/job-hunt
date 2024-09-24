import React from "react";
import JobCard from "./JobCard";

function LatestJob() {
  const dummy = [1, 2, 3, 4, 5, 6];
  return (
    <div className="mx-auto my-20 max-w-7xl">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#f83002]">Get Ready Student's </span>Apply fast
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5 ">
        {dummy.map((item) => {
          return <JobCard />;
        })}
      </div>
    </div>
  );
}

export default LatestJob;
