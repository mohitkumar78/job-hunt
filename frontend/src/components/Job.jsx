import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  const jobid = "76676756654e54";

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-md shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 day's ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://c8.alamy.com/comp/PWRHCW/building-construction-design-to-be-used-as-a-logo-icon-template-for-business-constructors-and-more-PWRHCW.jpg" />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div>
        <h1 className="my-2 text-lg font-bold">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
          provident explicabo nulla officia eaque deserunt, consequatur eos
          tenetur animi ipsum!
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          23position
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          fulltime
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          5LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => {
            navigate(`discription/${jobid}`);
          }}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
