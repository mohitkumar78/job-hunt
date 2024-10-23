import React from "react";
import {
  TableCaption,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "../components/ui/table";
import { Popover } from "../components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

function ApplicantsTable() {
  const Shortlisting = ["Accepted", "Rejected"];
  const { applicants } = useSelector((store) => store.applicants);
  const { user } = useSelector((store) => store.auth);
  const updateJobStatus = async (status, id) => {
    try {
      const res = await axios.post(
        `https://job-hunt-4.onrender.com/api/v4/application/update/${id}`,
        { status: status, token: user?.token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container px-5 py-10 mx-auto">
      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <Table className="w-full border-separate border-spacing-y-2">
          {/* Table Caption */}
          <TableCaption className="p-4 text-xl font-semibold text-gray-800">
            Recent Applicants
          </TableCaption>

          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-6 py-4 font-medium text-left text-gray-600">
                Full Name
              </TableHead>
              <TableHead className="px-6 py-4 font-medium text-left text-gray-600">
                Email
              </TableHead>
              <TableHead className="px-6 py-4 font-medium text-left text-gray-600">
                Contact
              </TableHead>
              <TableHead className="px-6 py-4 font-medium text-left text-gray-600">
                Resume
              </TableHead>
              <TableHead className="px-6 py-4 font-medium text-left text-gray-600">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 font-medium text-right text-gray-600">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {applicants?.applications?.length > 0 ? (
              applicants.applications.map((singleApplicant, index) => (
                <TableRow
                  key={index}
                  className="transition duration-200 ease-in-out bg-white hover:bg-gray-50"
                >
                  <TableCell className="px-6 py-4 text-gray-700">
                    {singleApplicant?.applicants?.name || "N/A"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700">
                    {singleApplicant?.applicants?.email || "N/A"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700">
                    {singleApplicant?.applicants?.PhoneNumber || "N/A"}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <a
                      href={singleApplicant?.applicants?.profile?.resume}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </a>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-700">
                    {new Date(
                      singleApplicant?.applicants?.createdAt
                    ).toLocaleDateString() || "N/A"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="text-gray-500 cursor-pointer hover:text-gray-700" />
                      </PopoverTrigger>
                      <PopoverContent className="p-2 bg-white border rounded-md shadow-lg">
                        {Shortlisting.map((status, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              updateJobStatus(status, singleApplicant._id)
                            }
                            className="px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
                          >
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No applicants found for this job.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default ApplicantsTable;
