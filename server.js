import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

console.log("Profile routes loaded");

