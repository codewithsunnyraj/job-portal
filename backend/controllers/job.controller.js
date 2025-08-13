import { Job } from "../models/job.model.js";
//Post job by admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (!title) {
      return res.status(400).json({
        message: "Title is Missing",
        success: false,
      });
    } else if (!description) {
      return res.status(400).json({
        message: "Description is Missing ",
        success: false,
      });
    } else if (!requirements) {
      return res.status(400).json({
        message: "Requirements is Missing",
        success: false,
      });
    } else if (!salary) {
      return res.status(400).json({
        message: "salary is Missing",
        success: false,
      });
    } else if (!location) {
      return res.status(400).json({
        message: "salary is Missing",
        success: false,
      });
    } else if (!jobType) {
      return res.status(400).json({
        message: "jobType is Missing",
        success: false,
      });
    } else if (!experience) {
      return res.status(400).json({
        message: "experience is Missing",
        success: false,
      });
    } else if (!position) {
      return res.status(400).json({
        message: "position is Missing",
        success: false,
      });
    } else if (!companyId) {
      return res.status(400).json({
        message: "companyId is Missing",
        success: false,
      });
    }

    const job = await Job({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    await job.save();
    return res.status(201).json({
      message: "job created Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while Posting Job",
      success: false,
    });
  }
};

//student ke liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || ""; //?
    const query = {
      $or: [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while Accessing Job",
      success: false,
    });
  }
};

//getJobsBy Id (Students)
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(400).json({
        message: "Job Not Found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error while Accessing Job",
      success: false,
    });
  }
};

//How many job created by admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      createdAt: -1,
    });
    console.log(jobs);
    if (!jobs) {
      return res.status(400).json({
        message: "Jobs Are Not Found",
        success: false,
      });
    }
    res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error While Fetching Admin Jobs",
      success: false,
    });
  }
};
