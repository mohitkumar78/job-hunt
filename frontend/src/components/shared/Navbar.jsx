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
import { LogOut, User2 } from "lucide-react";
import { logout } from "../../redux/auth.slice";

function Navbar() {
  const dispatch = useDispatch(); // Initialize useDispatch
  const { name, email, isAuthenticated } = useSelector((state) => state.auth);
  console.log(name, email, isAuthenticated);
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
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
                    <h4 className="font-medium">{name}</h4>
                    <h4 className="font-medium">{email}</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur
                    </p>
                  </div>
                </div>

                <div className="flex flex-col mt-4 text-gray-600">
                  <div className="flex items-center mb-2">
                    <User2 className="mr-2" />
                    <Button variant="link">View Profile</Button>
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
