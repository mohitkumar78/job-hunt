import React, { useEffect } from "react";
import Job from "./Job";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuerry } from "../redux/job.slice";
import useGetAllJob from "../Hook/useGetAllJob";
const Browse = () => {
  useGetAllJob();
  const dispatch = useDispatch();
  const { alljobs } = useSelector((store) => store.job);
  useEffect(() => {
    return () => {
      dispatch(setSearchQuerry(""));
    };
  }, []);
  return (
    <div>
      <div className="mx-auto my-10 max-w-7xl">
        <h1 className="my-10 text-xl font-bold">
          Search Results ({alljobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {alljobs?.map((job, index) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
