import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

function LatestJob() {
  const { alljobs } = useSelector((store) => store.job);
  const { isAuthenticated } = useSelector((store) => store.auth);

  return (
    <div className="mx-auto my-10 max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-center">
        <span className="text-[#f83002]">Get Ready Students</span>, Apply Fast!
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isAuthenticated ? (
          alljobs && alljobs.length > 0 ? (
            alljobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <span className="text-gray-500 col-span-full">
              No jobs are available. Try again later.
            </span>
          )
        ) : (
          <span className="text-gray-500 col-span-full">
            Please Login to view available jobs.
          </span>
        )}
      </div>
    </div>
  );
}

export default LatestJob;
