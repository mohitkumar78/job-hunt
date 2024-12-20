import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { setSearchQuerry } from "../redux/job.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Herosection() {
  const [querry, setQuerry] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchHandler = () => {
    dispatch(setSearchQuerry(querry));
    navigate("/browse");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <h1 className="text-5xl font-extrabold leading-tight text-center">
        Discover, Apply & <br />
        Secure Your{" "}
        <span className="text-yellow-300 underline">Ideal Career</span>
      </h1>
      <p className="max-w-2xl text-lg font-semibold text-center text-gray-200">
        Chandigarh University has consistently maintained strong placement
        records, with top recruiters offering lucrative opportunities.
      </p>
      <div className="flex w-[90%] md:w-[60%] lg:w-[40%] shadow-lg border bg-white border-gray-200 pl-3 rounded-full items-center gap-4">
        <Input
          type="text"
          onChange={(e) => setQuerry(e.target.value)}
          placeholder="Find your dream jobs"
          className="w-full border-none outline-none"
        />
        <Button
          onClick={searchHandler}
          className="rounded-r-full bg-[#6A38C2] hover:bg-[#552399]"
        >
          <Search className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
}

export default Herosection;
