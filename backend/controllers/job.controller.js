import { Job } from "../models/job.model.js";

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
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      companyId
    ) {
      return res.status(400).json({
        message: "Missing Job Details ",
        success: true,
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
      success: true,
    });
  }
};
