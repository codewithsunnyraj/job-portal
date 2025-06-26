import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { DbConfig } from "./config/Dbconfig.js";
const app = express();
configDotenv();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http:mere //localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//Port Define *//
const PORT = process.env.PORT || 4000;
//Port Define *//
app.listen(PORT, () => {
  DbConfig();
  
  console.log(`Server is running on port ${PORT}`);
});
