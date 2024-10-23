import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setApplicants } from "../redux/Applicants.slice";
function Applicants() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { applicants } = useSelector((store) => store.applicants);
  console.log(_id);
  useEffect(() => {
    const allApplicants = async () => {
      try {
        const res = await axios.post(
          `https://job-hunt-4.onrender.com/api/v4/application/getApplicant/${_id}`,
          {
            token: user?.token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setApplicants(res.data.JOB));
      } catch (error) {
        console.log("erorr in fetching applicants");
      }
    };
    allApplicants();
  }, []);
  return (
    <div>
      <div className="max-w-7xl">
        <h1 className="my-5 text-xl font-bold text-white">
          Applicants({applicants?.applications?.length})
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
