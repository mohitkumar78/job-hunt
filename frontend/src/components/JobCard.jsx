import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/discription/${job._id}`);
      }}
      className="p-5 bg-white border border-gray-100 rounded-md shadow-xl cursor-pointer"
    >
      <div>
        <h1 className="text-lg font-medium">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job.opening} opening
        </Badge>
        <Badge className={"text-[#f83002] font-bold"} variant="ghost">
          {job.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job.sallary} rs/month
        </Badge>
      </div>
    </div>
  );
}

export default JobCard;
