import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

function LatestJob() {
  const { alljobs } = useSelector((store) => store.job);
  const { isAuthenticated } = useSelector((store) => store.auth);

  return (
    <div className="mx-auto my-20 max-w-7xl">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#f83002]">Get Ready Students </span>Apply fast
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5 ">
        {isAuthenticated ? (
          // Check if there are jobs, otherwise show a message
          !alljobs || alljobs.length === 0 ? (
            <span>No jobs are available. Try again later.</span>
          ) : (
            alljobs.map((job) => <JobCard key={job._id} job={job} />)
          )
        ) : (
          <span>Please Login to view available jobs.</span>
        )}
      </div>
    </div>
  );
}

export default LatestJob;
