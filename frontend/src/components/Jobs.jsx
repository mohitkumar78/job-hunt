import React, { useEffect, useState } from "react";
import FilterJob from "./FilterJob";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];
  const { alljobs, searchTextQuerry } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(alljobs);
  useEffect(() => {
    if (searchTextQuerry) {
      const filteredJobs = alljobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchTextQuerry.toLowerCase()) ||
          job.description
            .toLowerCase()
            .includes(searchTextQuerry.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTextQuerry.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(alljobs);
    }
  }, [alljobs, searchTextQuerry]);

  return (
    <div>
      <div className="mx-auto mt-5 max-w-7xl">
        <div className="flex gap-4">
          <div className="w-1/5">
            <FilterJob />
          </div>
          {filterJobs.length <= 0 ? (
            <span>No Jobs are Available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
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
