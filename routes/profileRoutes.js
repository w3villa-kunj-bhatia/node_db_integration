import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Profile from "../models/Profile.js";
import { createProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name email"
    );

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", authMiddleware, createProfile);

export default router;
