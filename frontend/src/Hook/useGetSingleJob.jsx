import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSingleJob } from "../redux/job.slice";
import axios from "axios";

function useGetSingleJob(jobid) {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  console.log(jobid);

  useEffect(() => {
    const fetchSingleJob = async (jobid, token) => {
      try {
        const res = await axios.post(
          `https://job-hunt-4.onrender.com/api/v3/jobs/getjobById`, // Pass jobid in the URL
          { token: token, jobid: jobid }, // Send the token and jobid in the request body
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log(res.data);
        // Set job data to state
        dispatch(setSingleJob(res.data.job2)); // Assuming res.data contains the job data
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (user?.token && jobid) {
      fetchSingleJob(jobid, user.token); // Pass jobid and token here
    }
  }, [jobid, user.token]);
}

export default useGetSingleJob;
