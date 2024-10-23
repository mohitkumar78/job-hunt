import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setAllAppliedJob } from "../redux/job.slice";
function useGetAllAppliedJob() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const AppliedJob = async () => {
      try {
        const res = await axios.post(
          "https://job-hunt-4.onrender.com/api/v4/application/getAppliedJob",
          {
            token: user?.token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setAllAppliedJob(res.data.appliedJobs));
      } catch (error) {
        console.log("error in useGetAppliedjob");
      }
    };
    AppliedJob();
  }, []);
}

export default useGetAllAppliedJob;
