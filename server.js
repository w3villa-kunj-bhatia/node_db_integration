import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// CORS
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "http://localhost:5000",
      "http://127.0.0.1:5000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Static frontend serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/public"));

app.use(express.json());
connectDB();

// Routes
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

// Error Handler
import { errorHandler } from "./middleware/errorHandler.js";
app.use(errorHandler);

// Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
