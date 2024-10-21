import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { setSingleCompany } from "../redux/Company.slice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

function CreateCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [company, setComapny] = useState("");
  const { user } = useSelector((state) => state.auth);

  const RigisterCompany = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v2/company/register",
        {
          token: user?.token,
          CompanyName: company,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Company registered successfully!");
        dispatch(setSingleCompany(res?.data?.company));
        navigate(`/admin/companies/${res?.data?.company?._id}`);
      } else {
        toast.error("Something went wrong while registering the company.");
      }
    } catch (error) {
      console.log("Error occurred while registering the company.");
      toast.error("Error occurred while registering the company.");
    }
  };

  return (
    <div className="min-h-screen bg-[#003566] flex items-center justify-center text-white">
      <div className="max-w-4xl w-full mx-auto p-8 bg-[#001D3D] rounded-lg shadow-lg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#F83002]">
            Create Your Company
          </h1>
          <p className="mt-2 text-gray-300">
            Give your company a unique name. You can always change this later.
          </p>
        </div>

        <Label className="mb-2 text-lg font-semibold text-white">
          Company Name
        </Label>
        <Input
          type="text"
          className="mb-4 bg-white text-black w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-[#F83002]"
          placeholder="Enter company name (e.g., Google, JobHunt, Microsoft)"
          onChange={(e) => {
            e.preventDefault();
            setComapny(e.target.value);
          }}
        />

        <div className="flex items-center gap-5 mt-6">
          <Button
            variant="outline"
            className="text-white transition-colors duration-300 border border-gray-300 hover:bg-gray-700 hover:border-gray-600"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>

          <Button
            className="bg-[#F83002] text-white px-6 py-2 rounded-md hover:bg-[#cc2600] transition-colors duration-300"
            onClick={RigisterCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
