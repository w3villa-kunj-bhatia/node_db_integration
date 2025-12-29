import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
  try {
    const UserId = req.user.id;
    const { age, industry, role, skills, hobbies, bio, location } = req.body;

    const existingProfile = await Profile.findOne({ user: UserId });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile already exists for this user" });
    }

    const profile = await Profile.create({
      user: UserId,
      age,
      industry,
      role,
      skills,
      hobbies,
      bio,
      location,
    });

    return res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Create Profile error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
