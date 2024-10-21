import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../Hook/useGetAllAdminJobs";
import { setSearchJobByText } from "../redux/job.slice";

const AdminJob = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-10">
      <div className="max-w-6xl p-6 mx-auto my-10 bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <Input
            className="w-96 px-4 py-2 text-black bg-gray-100 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-[#F83002] transition-all duration-300 ease-in-out hover:shadow-lg"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="px-5 py-2 bg-[#F83002] text-white font-semibold rounded-lg shadow-md hover:bg-[#cc2600] transition-colors duration-300 ease-in-out hover:shadow-lg"
          >
            + New Job
          </Button>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden bg-[#fefefe] rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJob;
