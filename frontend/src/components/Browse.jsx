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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="py-8 mx-auto max-w-7xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          Browse Job Listings
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Find your dream job from our collection of opportunities
        </p>
      </div>

      {/* Content Section */}
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Search Results Count */}
        <h2 className="mb-6 text-lg font-semibold text-gray-700">
          Search Results:{" "}
          <span className="font-bold text-gray-900">{alljobs.length}</span>
        </h2>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {alljobs?.map((job, index) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="py-6 mt-10 text-center bg-gray-100">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Job Hunt. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Browse;
