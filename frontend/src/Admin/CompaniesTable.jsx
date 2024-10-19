import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";

function CompaniesTable() {
  const { Companies } = useSelector((store) => store.company);
  console.log(Companies);

  return (
    <div>
      <Table>
        <TableCaption className="text-white">
          A list of recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Companies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white">
                No company is registered by you
              </TableCell>
            </TableRow>
          ) : (
            Companies.map((company) => (
              <TableRow key={company._id}>
                {" "}
                {/* Ensure each company is in its own row */}
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} alt={company.name} />{" "}
                    {/* Fixed the closing tag */}
                  </Avatar>
                </TableCell>
                <TableCell className="text-white">{company.name}</TableCell>
                <TableCell className="text-white">12-10-2024</TableCell>{" "}
                {/* Replace with actual date if needed */}
                <TableCell>
                  <Popover>
                    <PopoverTrigger className="text-right">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer w-fit">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CompaniesTable;
