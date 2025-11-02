// backend/src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";

dotenv.config();

const app = express();

// ✅ Allow frontend to send cookies
const FRONTEND_URL = process.env.FRONTEND_URL || "https://mini-event-finder-pi.vercel.app" ;
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

export default app;
