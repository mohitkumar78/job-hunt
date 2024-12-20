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
  const { jobid } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
  useGetSingleJob(jobid);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicants === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

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
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicants: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during application.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-6xl p-8 mx-auto my-10 rounded-lg shadow-md bg-gray-50">
      {/* Job Title and Apply Section */}
      <div className="flex items-center justify-between pb-6 border-b">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {singleJob?.title || "Job Title"}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <Badge className="font-medium text-blue-700 bg-blue-100">
              {singleJob?.openings || "12"} Openings
            </Badge>
            <Badge className="font-medium text-red-700 bg-red-100">
              {singleJob?.jobType || "Full-time"}
            </Badge>
            <Badge className="font-medium text-purple-700 bg-purple-100">
              ₹{singleJob?.salary || "5LPA"}
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-3 text-white rounded-lg ${
            isApplied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Job Details */}
      <div className="mt-6 space-y-4">
        <h2 className="pb-2 text-lg font-semibold text-gray-700 border-b">
          Job Details
        </h2>
        <p>
          <span className="font-semibold text-gray-600">Role: </span>
          {singleJob?.role || "Frontend Developer"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Location: </span>
          {singleJob?.location || "Mumbai"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Description: </span>
          {singleJob?.description ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Experience: </span>
          {singleJob?.experience || "0 yrs"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">
            Total Applicants:{" "}
          </span>
          {singleJob?.applications?.length || "40"}
        </p>
        <p>
          <span className="font-semibold text-gray-600">Posted Date: </span>
          {singleJob?.postedDate || "12/20/2023"}
        </p>
      </div>
    </div>
  );
}

export default JobDescription;
