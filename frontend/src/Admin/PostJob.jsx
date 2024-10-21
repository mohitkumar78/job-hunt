import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const PostJob = () => {
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    opening: 0,
    CompanyId: "",
    token: user?.token,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { Companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = Companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, CompanyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:3000/api/v3/jobs/createjob`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/job");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-10 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-4xl p-8 bg-white border border-gray-200 rounded-lg shadow-xl"
      >
        <h1 className="mb-8 text-2xl font-bold text-center text-indigo-600">
          Post a New Job
        </h1>
        <div className="grid grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <Label className="font-bold text-gray-700">Title</Label>
            <Input
              type="text"
              name="title"
              value={input.title}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="font-bold text-gray-700">Description</Label>
            <Input
              type="text"
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Requirements */}
          <div>
            <Label className="font-bold text-gray-700">Requirements</Label>
            <Input
              type="text"
              name="requirements"
              value={input.requirements}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Salary */}
          <div>
            <Label className="font-bold text-gray-700">Salary</Label>
            <Input
              type="number"
              name="salary"
              value={input.salary}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Location */}
          <div>
            <Label className="font-bold text-gray-700">Location</Label>
            <Input
              type="text"
              name="location"
              value={input.location}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Job Type */}
          <div>
            <Label className="font-bold text-gray-700">Job Type</Label>
            <Input
              type="text"
              name="jobType"
              value={input.jobType}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Experience Level */}
          <div>
            <Label className="font-bold text-gray-700">Experience Level</Label>
            <Input
              type="number"
              name="experience"
              value={input.experience}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Opening */}
          <div>
            <Label className="font-bold text-gray-700">No. of Positions</Label>
            <Input
              type="number"
              name="opening"
              value={input.opening}
              onChange={changeEventHandler}
              className="w-full p-3 my-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Company Selector */}
          <div>
            <Label className="font-bold text-gray-700">Company</Label>
            {Companies.length > 0 ? (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Companies.map((company) => (
                      <SelectItem
                        key={company._id}
                        value={company?.name?.toLowerCase()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-red-500">No companies registered</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button className="flex items-center justify-center w-full py-3 my-4 text-white bg-indigo-600 rounded-md">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full py-3 my-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
          >
            Post New Job
          </Button>
        )}
      </form>
    </div>
  );
};

export default PostJob;
