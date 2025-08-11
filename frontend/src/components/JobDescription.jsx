import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  // Fetch Single Job
  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch]);

  // Check if already applied (run whenever job or user changes)
  useEffect(() => {
    if (singleJob?.applications && user?._id) {
      setIsApplied(
        singleJob.applications.some(
          (application) => application.applicant === user._id
        )
      );
    }
  }, [singleJob, user?._id]);

  // Apply Job Handler
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true); // local state update
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob)); // update Redux for realtime UI
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error while Applying", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="">
      <Navbar />
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
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold border-b-2 pb-3 border-b-gray-400">
            Job Description
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
            <h5 className="font-semibold">Experience:</h5>
            <span>{singleJob?.experienceLevel} Yrs</span>
          </div>
          <div className="flex items-center my-2 gap-6">
            <h5 className="font-semibold">Salary:</h5>
            <span>{singleJob?.salary} LPA</span>
          </div>
          <div className="flex items-center my-2 gap-6">
            <h5 className="font-semibold">Total Applicants:</h5>
            <span>{singleJob?.applications?.length || 0}</span>
          </div>
          <div className="flex items-center my-2 gap-6">
            <h5 className="font-semibold">Posted Date:</h5>
            <span>
              {singleJob?.createdAt
                ? singleJob.createdAt.split("T")[0]
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
