import mongoose from "mongoose";
import dontenv from "dotenv";
import * as logger from "../utils/logger.js";
dontenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error("Failed: ", error.message);
    process.exit(1);
  }
};
