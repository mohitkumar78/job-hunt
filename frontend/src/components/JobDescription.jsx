import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import useGetSingleJob from "../Hook/useGetSingleJob";
import { useSelector, useDispatch } from "react-redux";
import { setSingleJob } from "../redux/job.slice";
import { toast } from "sonner";
import axios from "axios";

function JobDescription() {
  const { jobid } = useParams(); // Get jobid from URL parameters
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  // Fetch job data using jobid
  const { user } = useSelector((store) => store.auth);
  useGetSingleJob(jobid);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicants === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  // Re-check if application state changes when singleJob updates
  useEffect(() => {
    setIsApplied(isInitiallyApplied);
  }, [singleJob, user]);

  const applyJobHandler = async () => {
    if (!user || !user.token || !user._id) {
      toast.error("Please log in to apply for the job.");
      return;
    }

    try {
      const res = await axios.post(
        "https://job-hunt-4.onrender.com/api/v4/application/apply",
        {
          token: user.token,
          applicantId: user._id,
          jobId: jobid,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicants: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Application error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during application.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            {singleJob?.title || "Title"}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singleJob?.openings || "12"} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singleJob?.jobType || "Frontend Developer"}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singleJob?.salary || "5LPA"}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="py-4 font-medium border-b-2 border-b-gray-300">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="my-1 font-bold text-[#f83002]">
          Role:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.role || "Frontend Developer"}
          </span>
        </h1>
        <h1 className="my-1 font-bold text-[#f83002]">
          Location:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.location || "Mumbai"}
          </span>
        </h1>
        <h1 className="my-1 font-bold text-[#f83002]">
          Description:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.description || "Lorem ipsum dolor sit amet..."}
          </span>
        </h1>
        <h1 className="my-1 font-bold text-[#f83002]">
          Experience:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.experience || "0 yrs"}
          </span>
        </h1>
        <h1 className="my-1 font-bold text-[#f83002]">
          Salary:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.salary || "7LPA"}
          </span>
        </h1>
        <h1 className="my-1 font-bold text-[#f83002]">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.applications?.length || "40"}
          </span>
        </h1>
        <h1 className="my-1 font-bold text-[#f83002]">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-white">
            {singleJob?.postedDate || "12/20/2023"}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
