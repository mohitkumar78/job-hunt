import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllJob } from "../redux/job.slice";

function useGetAllJob() {
  console.log("all companies");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v3/jobs/getalljob",
          {
            token: user?.token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("Jobs fetched successfully:", res.data);

        // Dispatch res.data directly
        dispatch(setAllJob(res.data.jobs)); // Update this line
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    if (user?.token) {
      fetchAllJobs();
    }
  }, [user?.token, dispatch]);

  return null; // or any UI based on the hook
}

export default useGetAllJob;
