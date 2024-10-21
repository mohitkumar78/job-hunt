import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAdminJob } from "../redux/job.slice";
function useGetAllAdminJobs() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAdminJob = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v3/jobs/getJobAdmin",
          {
            token: user?.token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          console.log(res);
          dispatch(setAdminJob(res.data.jobs));
        }
      } catch (error) {
        console.log("error occur in admin job", error);
      }
    };
    fetchAdminJob();
  }, []);
}

export default useGetAllAdminJobs;
