import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setSingleCompany } from "../redux/Company.slice";

function useCompanyDetail(_id) {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCompany = async (token, companyId) => {
      try {
        const res = await axios.post(
          `http://localhost:3000/api/v2/company/get/${companyId}`, // Pass the actual _id (companyId) here
          { token }, // Send the token in the request body
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        dispatch(setSingleCompany(res.data.company));
      } catch (error) {
        console.error("Error fetching company:", error);
      }
    };

    if (user?.token && _id) {
      // Ensure both the token and _id are available
      fetchSingleCompany(user.token, _id); // Pass token and _id here
    }
  }, [user.token, _id, dispatch]);

  return null;
}

export default useCompanyDetail;
