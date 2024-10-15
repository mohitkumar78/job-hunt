import React from "react";
import FilterJob from "./FilterJob";
import Job from "./Job";
import { useSelector } from "react-redux";
function Jobs() {
  const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const { alljobs } = useSelector((store) => store.job);
  return (
    <div>
      <div className="mx-auto mt-5 max-w-7xl">
        <div className="flex gap-4">
          <div className="w-1/5">
            <FilterJob />
          </div>
          {alljobs.length <= 0 ? (
            <span>No Jobs are Available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {alljobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
