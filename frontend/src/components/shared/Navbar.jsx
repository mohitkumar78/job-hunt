import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Ensure AvatarFallback is imported
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { LogOut, User2 } from "lucide-react";
import { setUser } from "../../redux/auth.slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const dispatch = useDispatch(); // Initialize useDispatch
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user, isAuthenticated);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(
          setUser({
            user: null,
            isAuthenticated: false,
          })
        );
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between h-16 mx-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#f83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-10 font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/job">Job</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#EF0000]">Signup</Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">{user.fullname}</h4>
                    <h4 className="font-medium">{user.email}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user.profile.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 text-gray-600">
                  <div className="flex items-center mb-2">
                    <User2 className="mr-2" />
                    <Button variant="link">
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <LogOut className="mr-2" />
                    <Button variant="link" onClick={handleLogout}>
                      Logout
                    </Button>{" "}
                    {/* Logout button */}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
