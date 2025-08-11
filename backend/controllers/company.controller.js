import mongoose from "mongoose";
import { Company } from "../models/company.model.js";
import getDataUri from "../config/datauri.js";
import cloudinary from "../config/cloundinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Missing Company Name",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can't Register Same Company",
        success: false,
      });
    }
    company = await Company({
      name: companyName,
      userId: req.id,
    });
    await company.save();
    return res.status(200).json({
      message: "Company Registered Successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while Register Company",
      success: false,
    });
  }
};

//Jo user login hai jitna company create kiya hai sirf wohi dikhega
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; //Jo user login rhega uska id le lega
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(400).json({
        message: "Companies not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Data",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while Accessing company using Id",
      success: false,
    });
  }
};

//Get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid Id",
        success: false,
      });
    }
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company Found By Id ",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while Accessing company using Id",
      success: false,
    });
  }
};

//Update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
    const file = req.file;
    //Cloudnary part here
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid Id",
        success: false,
      });
    }
    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        message: "Error while Updating Company ",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information Updated Successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error while Updating Company ",
      success: false,
    });
  }
};
