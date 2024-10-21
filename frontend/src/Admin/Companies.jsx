import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllComapnies from "../Hook/useGetAllComapnies";
import { useDispatch } from "react-redux";
import { setSearchText } from "../redux/Company.slice";

function Companies() {
  useGetAllComapnies();
  const [input, setInput] = useState(""); // Corrected "setinput" to "setInput"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchText(input)); // Dispatch search text when input changes
  }, [input]);

  return (
    <div className="min-h-screen bg-[#003566] text-white py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#F83002]">Companies</h1>
          <Button
            onClick={() => {
              navigate("/admin/createCompany");
            }}
            className="bg-[#F83002] text-white hover:bg-[#cc2600] transition-colors duration-300"
          >
            + New Company
          </Button>
        </div>

        {/* Filter Section */}
        <div className="flex items-center justify-between mb-10">
          <Input
            className="bg-white text-black w-96 px-4 py-2 rounded-lg shadow-md focus:ring focus:ring-[#F83002]"
            placeholder="Search companies by name..."
            value={input} // Bind input state to value
            onChange={(e) => setInput(e.target.value)} // Update state when user types
          />
        </div>

        {/* Companies Table */}
        <div className="bg-[#001D3D] rounded-lg p-6 shadow-lg">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}

export default Companies;
