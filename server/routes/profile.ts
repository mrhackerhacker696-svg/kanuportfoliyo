import express from "express";
import { Profile } from "../models/index.js";
import { isMongoDBAvailable } from "../database/connection.js";

const router = express.Router();

// Get profile
router.get("/", async (req, res) => {
  try {
    if (!isMongoDBAvailable()) {
      return res.status(503).json({
        error: "MongoDB not available",
        message: "Please use localStorage or set up MongoDB connection",
      });
    }

    const userId = "kanu-portfolio"; // Default user ID
    let profile = await Profile.findOne({ userId });

    if (!profile) {
      // Create default profile if doesn't exist
      profile = new Profile({ userId });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update profile
router.put("/", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const updateData = req.body;

    const profile = await Profile.findOneAndUpdate({ userId }, updateData, {
      new: true,
      upsert: true,
    });

    res.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Update profile image
router.put("/image", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const { profileImage } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { profileImage },
      { new: true, upsert: true },
    );

    res.json(profile);
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ error: "Failed to update profile image" });
  }
});

// Update logo
router.put("/logo", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const { logoText } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { logoText },
      { new: true, upsert: true },
    );

    res.json(profile);
  } catch (error) {
    console.error("Error updating logo:", error);
    res.status(500).json({ error: "Failed to update logo" });
  }
});

// Update resume URL
router.put("/resume", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const { resumeUrl } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { resumeUrl },
      { new: true, upsert: true },
    );

    res.json(profile);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: "Failed to update resume" });
  }
});

// Update contact info
router.put("/contact", async (req, res) => {
  try {
    const userId = "kanu-portfolio";
    const { contactInfo } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      { contactInfo },
      { new: true, upsert: true },
    );

    res.json(profile);
  } catch (error) {
    console.error("Error updating contact info:", error);
    res.status(500).json({ error: "Failed to update contact info" });
  }
});

export default router;
