import express from "express";
import dotenv from "dotenv";
import donorRoutes from "./routes/donor.js";
import { connectDB } from "./config/db.js";
import * as middleware from "./utils/middleware.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

//Routes
app.use("/api/donors", donorRoutes);
app.use(middleware.unKnownEndPoint);
app.use(middleware.errorHandler);

export default app;
