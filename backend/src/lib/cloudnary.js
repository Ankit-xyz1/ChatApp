import { v2 as cloudnary } from "cloudinary";
import { configDotenv } from "dotenv";
import dotenv from "dotenv"


dotenv.config();

cloudnary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key:  process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET,
});

export default cloudnary
