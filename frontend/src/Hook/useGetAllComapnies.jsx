import React, { useEffect } from "react";
import axios from "axios";
import { setAllCompany } from "../redux/Company.slice";
import { useSelector, useDispatch } from "react-redux";

function useGetAllCompanies() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v2/company/get",
          {
            token: user?.token,
          },
          {
            headers: {
              "Content-Type": "application/json",
              // Send token in headers
            },
          }
        );

        dispatch(setAllCompany(res.data.comapnies)); // Dispatch companies to Redux store
      } catch (error) {
        console.log("Error in fetching all companies:", error);
      }
    };

    if (user?.token) {
      // Only fetch if the token exists
      getAllCompanies();
    }
  }, [user?.token, dispatch]); // Added necessary dependencies
}

export default useGetAllCompanies;
