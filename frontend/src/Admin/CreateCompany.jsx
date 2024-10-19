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

      console.log(res);
    } catch (error) {
      console.log("Error occurred while registering the company.");
      toast.error("Error occurred while registering the company.");
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="text-2xl font-bold text-[#F83002]">
            Your Company Name{" "}
          </h1>
          <p className="text-white">
            What would you like to give your company name? You can change this
            later.
          </p>
        </div>
        <Label className="font-sans text-2xl text-white">Company Name</Label>
        <Input
          type="text"
          className="my-2 text-white"
          placeholder="Google, JobHunt, Microsoft, etc..."
          onChange={(e) => {
            e.preventDefault();
            setComapny(e.target.value);
          }}
        ></Input>
        <div className="flex items-center gap-5 mb-10 my-7">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/admin/companies"); // Fix the path
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              RigisterCompany();
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
