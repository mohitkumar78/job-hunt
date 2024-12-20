import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/discription/${job._id}`)}
      className="flex flex-col justify-between p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl"
    >
      {/* Company Details */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>

      {/* Job Title and Description */}
      <div className="mt-4">
        <h2 className="mb-2 text-lg font-bold text-gray-900">{job.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
      </div>

      {/* Badges for Job Info */}
      <div className="flex flex-wrap items-center gap-2 mt-6">
        <Badge className="px-3 py-1 font-bold text-blue-700 bg-blue-100 rounded-full">
          {job.opening} Openings
        </Badge>
        <Badge className="px-3 py-1 font-bold text-red-700 bg-red-100 rounded-full">
          {job.jobType}
        </Badge>
        <Badge className="px-3 py-1 font-bold text-purple-700 bg-purple-100 rounded-full">
          ₹{job.sallary} / Month
        </Badge>
      </div>
    </div>
  );
}

export default JobCard;
