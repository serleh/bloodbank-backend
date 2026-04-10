import express from "express";
import dotenv from "dotenv";
import donorRoutes from "./routes/donor.js";
import { connectDB } from "./config/db.js";
import * as middleware from "./utils/middleware.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(middleware.requestLogger);

//Routes
app.use("/api/donors", donorRoutes);
app.use(middleware.unKnownEndPoint);
app.use(middleware.errorHandler);

export default app;
