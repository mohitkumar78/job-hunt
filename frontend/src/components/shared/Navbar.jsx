import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";

function Navbar() {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex justify-between mx-auto h-16 max-w-7xl">
        <div>
          <h1 className="font-bold text-2xl">
            Job<span className="text-[#f83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex font-medium items-center gap-10">
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

          {/* If user is not logged in */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#EF0000]">Signup</Button>
              </Link>
            </div>
          ) : (
            /* If user is logged in */
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                <div className="flex gap-4 items-center">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-medium">Mohit Mern Stack Developer</h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-gray-600 mt-4">
                  <div className="flex items-center mb-2">
                    <User2 className="mr-2" />
                    <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex items-center">
                    <LogOut className="mr-2" />
                    <Button variant="link">Logout</Button>
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
