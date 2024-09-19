import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";

function Signup() {
  return (
    <div
      className="flex items-center justify-start min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url('https://images.shiksha.com/mediadata/images/articles/1643083184php36Gcyp.jpeg')`,
      }}
    >
      <div className="flex items-center justify-start w-full">
        <form
          action=""
          className="w-1/2 p-8 my-10 border rounded-md mx-96 border-grey-200"
          style={{ backgroundColor: "black", opacity: 0.7 }}
        >
          <div className="flex justify-center mb-5">
            <img
              src="https://amark.academy/assets/uploads/f80184d2840e3822231d7e10cc4d9889.jpg"
              alt="Logo"
              className="w-32 h-auto" // Adjust the width and height as needed
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Fullname</Label>
            <Input
              className="text-white placeholder-white"
              type="text"
              placeholder="Enter your fullname"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Name</Label>
            <Input
              className="text-white placeholder-white"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="my-2">
            <Label className="text-white">Email</Label>
            <Input
              className="text-white placeholder-white"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="my-2">
            <Label className="text-white">Password</Label>
            <Input
              className="text-white placeholder-white"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="my-2">
            <Label className="text-white">Phone Number</Label>
            <Input
              className="text-white placeholder-white"
              type="number"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center justify-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  name="role"
                  className="text-white cursor-pointer"
                />
                <Label htmlFor="option-one" className="text-white">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  name="role"
                  className="text-white cursor-pointer"
                />
                <Label htmlFor="option-two" className="text-white">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label className="text-white">Profile</Label>
              <Input
                type="file"
                accept="image/*"
                placeholder="choose profile image"
                className="text-white cursor-pointer"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="text-white bg-black opacity-100 "
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
