import React from "react";
import FilterJob from "./FilterJob";
import Job from "./Job";

function Jobs() {
  const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div>
      <div className="mt-5 mx-60 max-w-7xl">
        <div className="flex gap-4">
          <div className="w-1/5">
            <FilterJob />
          </div>
          {jobArray.length <= 0 ? (
            <span>No Jobs are Available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {jobArray.map((item, index) => (
                  <div key={index}>
                    <Job />
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
