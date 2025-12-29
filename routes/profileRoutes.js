import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Profile from "../models/Profile.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
