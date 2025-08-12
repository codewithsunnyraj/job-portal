import ApplicantsTable from "@/components/admin/ApplicantsTable";
import Navbar from "@/components/shared/Navbar";
import { setAllApplicants } from "@/redux/applicationSlice";
import store from "@/redux/store";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { application } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {}
    };
    fetchAllApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1>
          Applicants (<span>{application?.application?.length}</span>)
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
