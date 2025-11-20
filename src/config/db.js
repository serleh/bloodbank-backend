import mongoose from "mongoose";
import dontenv from "dotenv";
dontenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Failed: ", error.message);
    process.exit(1);
  }
};
