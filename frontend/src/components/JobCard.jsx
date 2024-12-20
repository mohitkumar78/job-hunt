import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/discription/${job._id}`)}
      className="relative flex flex-col justify-between p-6 transition-shadow border border-gray-200 shadow-md cursor-pointer bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl hover:shadow-lg"
    >
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 rounded-t-xl"></div>

      {/* Company Details */}
      <div>
        <h1 className="text-lg font-semibold text-gray-800">
          {job?.company?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{job?.location}</p>
      </div>

      {/* Job Title and Description */}
      <div className="mt-4">
        <h2 className="mb-3 text-xl font-bold text-gray-900">{job.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>
      </div>

      {/* Badges for Job Info */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <Badge className="px-4 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full shadow-sm">
          {job.opening} Openings
        </Badge>
        <Badge className="px-4 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full shadow-sm">
          {job.jobType}
        </Badge>
        <Badge className="px-4 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full shadow-sm">
          ₹{job.sallary} / Month
        </Badge>
      </div>

      {/* Bottom Gradient Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-b-xl"></div>
    </div>
  );
}

export default JobCard;
