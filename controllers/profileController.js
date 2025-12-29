import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { age, industry, role, skills, hobbies, bio, location } = req.body;

    // Convert age to number
    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber <= 0) {
      return res.status(400).json({ message: "age must be a valid number" });
    }

    if (!age || !industry || !role) {
      return res
        .status(400)
        .json({ message: "age, industry, and role are required" });
    }

    const exists = await Profile.findOne({ user: UserId });
    if (exists)
      return res.status(400).json({ message: "Profile already exists" });

    const profile = await Profile.create({
      user: UserId,
      age: ageNumber,
      industry,
      role,
      skills,
      hobbies,
      bio,
      location,
    });

    res.status(201).json({ message: "Profile created", profile });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: error.message });
  }
};
