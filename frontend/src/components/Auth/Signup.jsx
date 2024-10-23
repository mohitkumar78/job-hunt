import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [input, setinput] = useState({
    name: "",
    email: "",
    fullname: "",
    PhoneNumber: "",
    password: "", // Updated key to lowercase
    role: "",
    file: null,
    // Use null initially
  });

  const inputHandler = (e) => {
    setinput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    setinput({
      ...input,
      file: e.target.files?.[0],
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("email", input.email);
      formData.append("fullname", input.fullname);
      formData.append("PhoneNumber", input.PhoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      formData.append("file", input.file);

      const response = await axios.post(
        "https://job-hunt-4.onrender.com/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error in signup:", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-start min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url('https://i.pinimg.com/736x/9e/93/c7/9e93c7dc4a0a8b6cca2f7a60ebac8b31.jpg')`,
      }}
    >
      <div className="flex items-center justify-start w-full">
        <form
          onSubmit={submithandler}
          className="w-1/2 p-8 my-10 border rounded-md mx-96 border-grey-200"
          style={{ backgroundColor: "black", opacity: 0.7 }}
        >
          <div className="flex justify-center mb-5">
            <img
              src="https://amark.academy/assets/uploads/f80184d2840e3822231d7e10cc4d9889.jpg"
              alt="Logo"
              className="w-32 h-auto"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Fullname</Label>
            <Input
              className="text-white placeholder-white"
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={inputHandler}
              placeholder="Enter your fullname"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Name</Label>
            <Input
              className="text-white placeholder-white"
              type="text"
              name="name"
              value={input.name}
              onChange={inputHandler}
              placeholder="Enter your name"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Email</Label>
            <Input
              className="text-white placeholder-white"
              type="email"
              name="email"
              value={input.email}
              onChange={inputHandler}
              placeholder="Enter your email"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Password</Label>
            <Input
              className="text-white placeholder-white"
              type="password" // Updated input type for password security
              name="password" // Changed to lowercase 'password'
              value={input.password}
              onChange={inputHandler}
              placeholder="Enter your password"
            />
          </div>

          <div className="my-2">
            <Label className="text-white">Phone Number</Label>
            <Input
              className="text-white placeholder-white"
              type="number"
              name="PhoneNumber"
              value={input.PhoneNumber}
              onChange={inputHandler}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center justify-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  checked={input.role === "student"}
                  name="role"
                  className="text-white cursor-pointer"
                  onChange={inputHandler}
                />
                <Label htmlFor="option-one" className="text-white">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  name="role"
                  className="text-white cursor-pointer"
                  onChange={inputHandler}
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
                placeholder="Choose profile image"
                className="text-white cursor-pointer"
                onChange={fileHandler}
              />
            </div>
          </div>

          <div className="flex gap-10">
            <Button
              type="submit"
              variant="outline"
              className="text-white bg-black opacity-100 "
            >
              Register
            </Button>
            <div>
              <span className="text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-800">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
