import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    // const { id: jobId } = req.params;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "JobId is Required",
        success: false,
      });
    }
    //check if user has already applied for the jobs
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    // console.log(existingApplication);
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already Applied for this jobs",
        success: false,
      });
    }
    //check if the jobs exist
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    //create a new application
    const newApplication = await Application({ job: jobId, applicant: userId });
    await newApplication.save();
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while Applying Job",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Application",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while Accessing Applied  Job",
      success: false,
    });
  }
};

//Admin dekhege ki jo wo job post kiya hai usme kitna user apply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log(jobId);
    if (!jobId) {
      return res.status(400).json({
        message: "Please Provide Job Id",
        success: false,
      });
    }
    const job = await Job.findById(jobId).populate({
      path: "applications", // ✅ field ka naam job model me
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error while Applying Job",
      success: false,
      error,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }
    const applicantionId = req.params.id;

    //Find the application by application Id
    const application = await Application.findOne({ _id: applicantionId });
    if (!application) {
      return res.status(404).json({
        message: "Application Not Found",
        success: false,
      });
    }
    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status Updated Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while Updating Job Status",
      success: false,
    });
  }
};
