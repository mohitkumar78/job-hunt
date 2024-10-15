import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Mail, Contact, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label"; // Add this if `Label` is part of your components
import AppliedJobTable from "./AppliedJobTable"; // Assuming this component exists
import { Badge } from "./ui/badge";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
function Profile() {
  const { user } = useSelector((store) => store.auth);
  console.log(user);
  const [open, setOpen] = useState(false);
  const isResume = true; // or set it based on your logic for the resume link
  const skills = user?.profile?.skills || [];

  return (
    <div className="max-w-3xl p-8 mx-auto my-5 bg-white border border-gray-200 shadow-lg rounded-2xl">
      <div className="flex items-center justify-between gap-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.profile.profileImg} alt="Profile" />
          </Avatar>

          {/* Text Section */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800">
              {user ? user.fullname : "Loading..."} {/* Add loading state */}
            </h1>
            <p className="max-w-lg mt-2 leading-relaxed text-gray-600">
              {user ? user.profile.bio : "Loading..."} {/* Add loading state */}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <Button
          className="text-right"
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          <Pen className="w-5 h-5" />
        </Button>
      </div>

      {/* Contact Information */}
      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
          <Mail className="w-5 h-5 text-gray-600" />
          <span>{user ? user.email : "Loading..."}</span>{" "}
          {/* Add loading state */}
        </div>
        <div className="flex items-center gap-3 my-2">
          <Contact className="w-5 h-5 text-gray-600" />
          <span>{user ? `+91 ${user.PhoneNumber}` : "Loading..."}</span>{" "}
          {/* Add loading state */}
        </div>
      </div>
      <div className="my-5">
        <h1>Skills</h1>
        <div className="flex items-center gap-1">
          {skills.length !== 0 ? (
            skills.map((item, index) => <Badge key={index}>{item}</Badge>)
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>

      {/* Resume Section */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label className="font-bold text-md">Resume</Label>
        {isResume ? (
          <a
            target="_blank"
            href={user?.profile?.resume}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            {user?.profile?.resumeFullName}
          </a>
        ) : (
          <span>NA</span>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="my-5 text-lg font-bold">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <EditProfile open={open} setOpen={setOpen} />
    </div>
  );
}
export default Profile;
