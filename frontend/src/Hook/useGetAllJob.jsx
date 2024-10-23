import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllJob } from "../redux/job.slice";

function useGetAllJob() {
  const { user } = useSelector((store) => store.auth);
  const { searchTextQuerry } = useSelector((store) => store.job); // Correctly grabbing searchTextQuerry
  const dispatch = useDispatch();

  console.log("searchTextQuerry:", searchTextQuerry); // Logging to check if it's being captured

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.post(
          `https://job-hunt-4.onrender.com/api/v3/jobs/getalljob?keyword=${
            searchTextQuerry || ""
          }`, // Adding default empty string if searchTextQuerry is undefined
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

        // Dispatch the jobs data to Redux store
        dispatch(setAllJob(res.data.jobs)); // Dispatching jobs list
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    if (user?.token) {
      fetchAllJobs();
    }
  }, [user?.token, searchTextQuerry, dispatch]); // Adding searchTextQuerry to dependency array

  return null; // or any UI based on the hook
}

export default useGetAllJob;
