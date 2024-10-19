import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useComapnyDetail from "../Hook/useComapnyDetail";
import { setSingleCompany } from "../redux/Company.slice";

const CompanySetup = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { singlecompany } = useSelector((store) => store.company);
  useComapnyDetail(params._id);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    CompanyName: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("CompanyName", input.CompanyName);
    formData.append("website", input.website);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("file", input.file);
    formData.append("token", user?.token);

    setLoading(true); // Set loading to true

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v2/company/update/${params._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleCompany(res?.data?.findCompany));
        navigate("/admin/companies");
      }
    } catch (error) {
      // Correcting the error handling
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false); // Stop loading in the finally block
    }
  };
  useEffect(() => {
    setInput({
      CompanyName: singlecompany.name || "",
      description: singlecompany.description || "",
      website: singlecompany.website || "",
      location: singlecompany.location || "",
      file: singlecompany.file || null,
    });
  }, [singlecompany]);

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 mb-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 transition-colors hover:bg-gray-100"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Company Setup</h1>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
            <div>
              <Label className="text-gray-600">Company Name</Label>
              <Input
                type="text"
                name="CompanyName"
                value={input.CompanyName}
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F83002] focus:border-[#F83002] transition-shadow"
              />
            </div>
            <div>
              <Label className="text-gray-600">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F83002] focus:border-[#F83002] transition-shadow"
              />
            </div>
            <div>
              <Label className="text-gray-600">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F83002] focus:border-[#F83002] transition-shadow"
              />
            </div>
            <div>
              <Label className="text-gray-600">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="mt-2 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#F83002] focus:border-[#F83002] transition-shadow"
              />
            </div>
            <div>
              <Label className="text-gray-600">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="p-3 mt-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          {loading ? (
            <Button className="w-full bg-[#F83002] text-white py-3 rounded-md flex justify-center items-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-[#F83002] text-white py-3 rounded-md hover:bg-[#e32700] transition-colors"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
