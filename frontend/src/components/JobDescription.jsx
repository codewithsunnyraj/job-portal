import React, { useEffect } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import store from "@/redux/store";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log(res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="my-16 mx-auto max-w-7xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl my-4">{singleJob?.title}</h1>
          <div className="flex gap-4 my-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} positions
            </Badge>
            <Badge className="text-red-700 font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-green-700 font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <div>
          {isApplied ? (
            <Button
              disabled={isApplied}
              className="disabled:bg-gray-600 cursor-not-allowed"
            >
              Already Applied
            </Button>
          ) : (
            <Button className="bg-red-500 ">Apply Now</Button>
          )}
        </div>
      </div>
      <div className="my-5">
        <h1 className="font-bold border-b-2 pb-3 border-b-gray-400">
          Job Descriptions
        </h1>
      </div>
      <div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Role:</h5>
          <span>{singleJob?.title}</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Location:</h5>
          <span>{singleJob?.location}</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Description:</h5>
          <span>{singleJob?.description}</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Experience</h5>
          <span>{singleJob?.experienceLevel} Yrs</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Salary:</h5>
          <span>{singleJob?.salary} LPA</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Total Applicants</h5>
          <span>{singleJob?.applications.length}</span>
        </div>
        <div className="flex items-center my-2 gap-6">
          <h5 className="font-semibold">Posted Date:</h5>
          <span>{singleJob?.createdAt.split("T")[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
