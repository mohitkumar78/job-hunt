import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";

function CompaniesTable() {
  const { Companies, searchText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(Companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      Companies.length >= 0 &&
      Companies.filter((company) => {
        if (!searchText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [Companies, searchText]);

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
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-white">
                No company is registered by you
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
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
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/admin/companies/${company._id}`); // Correctly navigate using company._id
                        }}
                        className="flex items-center gap-2 cursor-pointer w-fit"
                      >
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
