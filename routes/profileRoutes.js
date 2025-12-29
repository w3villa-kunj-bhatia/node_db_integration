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

router.put("/", authMiddleware, async (req, res) => {
  try {
    const UserId = req.user.id;

    const updated = await Profile.findOneAndUpdate(
      { user: UserId },
      { ...req.body, age: Number(req.body.age) },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
