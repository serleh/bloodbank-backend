import express from "express";
import dotenv from "dotenv";
import donorRoutes from "./routes/donor.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//Routes
app.use("/api/donors", donorRoutes);

export default app;
