import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/auth.slice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        {
          email: input.email,
          password: input.password,
          role: input.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        // Make sure to set both `user` and `isAuthenticated` in the dispatch payload
        dispatch(
          setUser({
            user: res.data.user,
            isAuthenticated: true,
          })
        );
        console.log(res.data.user);
        if (res.data.user.role === "recruiter") {
          navigate("/admin/Companies");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-start min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url('https://pbs.twimg.com/media/GOQTIpJXEAAK-hd?format=jpg&name=4096x4096')`,
      }}
    >
      <div className="flex items-center justify-start w-full">
        <form
          onSubmit={submitHandler} // Corrected submit handler name
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
              type="password"
              name="password"
              value={input.password}
              onChange={inputHandler}
              placeholder="Enter your password"
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
          </div>
          <div className="flex gap-10">
            <Button
              type="submit"
              variant="outline"
              className="text-white bg-black opacity-100"
            >
              Login
            </Button>
            <div>
              <span className="text-white">
                Don't have an account?
                <Link to="/signup" className="text-blue-800">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
