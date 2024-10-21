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
    <div className="flex flex-col items-center justify-center gap-5 my-10">
      <h1 className="text-5xl font-bold">
        Discover, Apply & <br />
        Secure Your <span className="text-[#f83002]">Ideal Career</span>
      </h1>

      <p className="font-bold  text-1xl text-[#6A38C2]">
        Chandigarh University has consistently maintained strong placement
        records, with top recruiters from diverse industries offering lucrative
        job opportunities.
      </p>
      <div className="flex w-[40%] shadow-lg border bg-white border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <Input
          type="text"
          onChange={(e) => setQuerry(e.target.value)}
          placeholder="Find your dream jobs"
          className="w-full border-none outline-none"
        />
        <Button onClick={searchHandler} className="rounded-r-full bg-[#6A38C2]">
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

export default Herosection;
