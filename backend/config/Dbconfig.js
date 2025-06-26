import mongoose from "mongoose";

export const DbConfig = async () => {
  const Mongo_url = process.env.MONGO_URL;
  try {
    const connect = await mongoose.connect(`${Mongo_url}/job-portal`);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error while connecting Database", error);
  }
};
