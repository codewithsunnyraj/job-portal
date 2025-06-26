import mongoose from "mongoose";

const applicationScheme = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      require: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },

    status: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationScheme);
