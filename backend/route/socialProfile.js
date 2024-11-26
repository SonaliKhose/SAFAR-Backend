const express = require("express");
const router = express.Router();
const SocialProfile = require("../model/socialProfile");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { authenticate } = require("passport");


// Multer setup for dynamic profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userUploadPath = path.join(__dirname, "../uploads/social-profiles");
    if (!fs.existsSync(userUploadPath)) {
      fs.mkdirSync(userUploadPath, { recursive: true });
    }
    cb(null, userUploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Create a new social profile
router.post(
  "/social-profile",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const {
        user_id,
        fullName,
        city,
        contactNo,
        email,
        address,
        dateOfBirth,
        gender,
        pincode,
        state,
        country,
      } = req.body;

      // Check if user_id is provided
      if (!user_id) {
        return res.status(400).json({ message: "user_id is required" });
      }

      const socialProfile = new SocialProfile({
        user_id,
        fullName,
        city,
        contactNo,
        email,
        address,
        dateOfBirth,
        gender,
        pincode,
        state,
        country,
        profilePicture: req.file
          ? `/uploads/social-profiles/${req.file.filename}`
          : undefined,
      });

      const savedProfile = await socialProfile.save();
      res.status(201).json(savedProfile);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);


// Update an existing social profile
router.put(
  "/social-profile",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const user_id = req.query.user_id;

      // Validate if user_id is a valid ObjectId
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid or missing user_id" });
      }

      let socialProfile = await SocialProfile.findOne({ user_id });

      if (!socialProfile) {
        // If profile doesn't exist, create a new one with the provided data
        socialProfile = new SocialProfile({
          user_id,
          fullName: req.body.fullName || "",
          email: req.body.email || "",
          city: req.body.city || "",
          contactNo: req.body.contactNo || "",
          address: req.body.address || "",
          dateOfBirth: req.body.dateOfBirth || "",
          gender: req.body.gender || "",
          pincode: req.body.pincode || "",
          state: req.body.state || "",
          country: req.body.country || "",
          profilePicture: req.file
            ? `/uploads/social-profiles/${req.file.filename}`
            : undefined,
        });

        await socialProfile.save();
        return res
          .status(201)
          .json({ message: "Social Profile created", profile: socialProfile });
      }

      // Update existing profile, clear fields if empty
      socialProfile.fullName = req.body.fullName || null;
      socialProfile.city = req.body.city || null;
      socialProfile.contactNo = req.body.contactNo || null;
      socialProfile.address = req.body.address || null;
      socialProfile.dateOfBirth = req.body.dateOfBirth || null;
      socialProfile.gender = req.body.gender || null;
      socialProfile.pincode = req.body.pincode || null;
      socialProfile.state = req.body.state || null;
      socialProfile.country = req.body.country || null;

      if (req.file) {
        socialProfile.profilePicture = `/uploads/social-profiles/${req.file.filename}`;
      }

      await socialProfile.save();
      res
        .status(200)
        .json({ message: "Social Profile updated", profile: socialProfile });
    } catch (error) {
      console.error(
        "Error updating or creating social profile:",
        error.message
      );
      res
        .status(500)
        .json({
          message: "Error updating or creating social profile",
          error: error.message,
        });
    }
  }
);


// Fetch a social profile by user_id
router.get("/social-profile", async (req, res) => {
  try {
    const user_id = req.query.user_id;

    // Validate if user_id is a valid ObjectId
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid or missing user_id" });
    }

    let socialProfile = await SocialProfile.findOne({ user_id });

    if (!socialProfile) {
      socialProfile = new SocialProfile({
        user_id,
        fullName: req.query.fullName || "",
        email: req.query.email || "",
      });

      await socialProfile.save();
      return res
        .status(201)
        .json({ message: "Social Profile created", profile: socialProfile });
    }

    res.status(200).json({ profile: socialProfile });
  } catch (error) {
    console.error("Error fetching social profile:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching social profile", error: error.message });
  }
});

// Update profile picture
router.put(
  "/social-profile/image",
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const user_id = req.query.user_id;

      // Validate if user_id is a valid ObjectId
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: "Invalid or missing user_id" });
      }

      const socialProfile = await SocialProfile.findOne({ user_id });

      if (!socialProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      if (req.file) {
        socialProfile.profilePicture = `/uploads/social-profiles/${req.file.filename}`;
      }

      await socialProfile.save();
      res
        .status(200)
        .json({ message: "Profile picture updated", profile: socialProfile });
    } catch (error) {
      console.error("Error updating profile picture:", error.message);
      res
        .status(500)
        .json({
          message: "Error updating profile picture",
          error: error.message,
        });
    }
  }
);

module.exports = router;
