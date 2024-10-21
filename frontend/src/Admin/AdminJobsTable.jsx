import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal, Eye } from "lucide-react";

function AdminJobsTable() {
  const { AdminAllJob, SearchJobByText } = useSelector((store) => store.job); // Fallback to empty array
  console.log(AdminAllJob);
  const [filterJob, setFilterJob] = useState(AdminAllJob);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob = AdminAllJob.filter((job) => {
      if (!SearchJobByText) {
        return true;
      }
      const searchText = SearchJobByText.toLowerCase();
      return (
        job?.title?.toLowerCase().includes(searchText) ||
        job?.company?.name?.toLowerCase().includes(searchText)
      );
    });
    setFilterJob(filteredJob);
  }, [AdminAllJob, SearchJobByText]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <Table className="bg-[#f9f9f9] rounded-lg">
        <TableCaption className="font-semibold text-black">
          A list of your recent posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-[#f5f5f5]">
            <TableHead className="text-left text-gray-600">
              Company Name
            </TableHead>
            <TableHead className="text-left text-gray-600">Role</TableHead>
            <TableHead className="text-left text-gray-600">Date</TableHead>
            <TableHead className="text-right text-gray-600">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJob.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No jobs posted by you.
              </TableCell>
            </TableRow>
          ) : (
            filterJob.map((job) => (
              <TableRow
                key={job._id}
                className="hover:bg-[#f1f1f1] transition duration-300 ease-in-out"
              >
                <TableCell className="text-gray-800">
                  {job?.company?.name || "N/A"}
                </TableCell>
                <TableCell className="text-gray-800">{job?.title}</TableCell>
                <TableCell className="text-gray-600">
                  {job?.createdAt?.split("T")[0] || "Unknown Date"}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="text-gray-600 cursor-pointer">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 bg-white rounded-lg shadow-md">
                      <div
                        onClick={() => navigate(`/admin/companies/${job._id}`)}
                        className="flex items-center gap-2 transition-colors duration-200 cursor-pointer hover:text-blue-600"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 mt-2 transition-colors duration-200 cursor-pointer hover:text-blue-600"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
