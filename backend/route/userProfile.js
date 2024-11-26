const express = require("express");
const profileRoute = express.Router();
const UserProfile = require("../model/userProfile");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { authenticate } = require("../middleware/authenticate");

// Multer setup for dynamic profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create dynamic directory based on user ID
    const userUploadPath = path.join(
      __dirname,
      "../uploads",
      req.user.id.toString()
    );

    // Ensure the directory exists
    if (!fs.existsSync(userUploadPath)) {
      fs.mkdirSync(userUploadPath, { recursive: true });
    }

    // Set the destination to the dynamic path
    cb(null, userUploadPath);
  },
  filename: (req, file, cb) => {
    // Set filename with timestamp to avoid collisions
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Serve the uploaded files statically
const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Route to create a user profile
profileRoute.post(
  "/profile",
  authenticate,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        contactNo,
        address,
        city,
        pincode,
        state,
        country,
        dateOfBirth,
        gender,
      } = req.body;

      const userId = req.user.id;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID is missing from the request" });
      }

      let profile = await UserProfile.findOne({ userId });

      if (profile) {
        return res.status(400).json({ message: "Profile already exists" });
      }

      const profileData = new UserProfile({
        fullName,
        email,
        contactNo,
        address,
        city,
        pincode,
        state,
        country,
        dateOfBirth,
        gender,
        userId,
        profilePicture: req.file
          ? `/uploads/${req.user.id}/${req.file.filename}`
          : undefined,
      });

      await profileData.save();
      res.json({
        message: "Profile created successfully",
        profile: profileData,
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      res
        .status(500)
        .json({ message: "Error creating profile", error: error.message });
    }
  }
);
// Route to update user profile
profileRoute.put(
  "/profile",
  authenticate,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        contactNo,
        address,
        city,
        pincode,
        state,
        country,
        dateOfBirth,
        gender,
      } = req.body;

      const userId = req.user.id;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID is missing from the request" });
      }

      // Check if the profile exists
      let profile = await UserProfile.findOne({ userId });

      if (!profile) {
        // If profile doesn't exist, create a new one instead of returning 404
        profile = new UserProfile({
          fullName,
          email,
          contactNo,
          address,
          city,
          pincode,
          state,
          country,
          dateOfBirth,
          gender,
          userId,
          profilePicture: req.file
            ? `/uploads/${req.user.id}/${req.file.filename}`
            : undefined, // Set profile picture if provided
        });

        await profile.save();
        return res
          .status(201)
          .json({ message: "Profile created successfully", profile });
      }

      // If profile exists, update its fields
      profile.fullName = fullName || profile.fullName;
      profile.email = email || profile.email;
      profile.contactNo = contactNo || profile.contactNo;
      profile.address = address || profile.address;
      profile.city = city || profile.city;
      profile.pincode = pincode || profile.pincode;
      profile.state = state || profile.state;
      profile.country = country || profile.country;
      profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
      profile.gender = gender || profile.gender;

      // Update profile picture if provided
      if (req.file) {
        profile.profilePicture = `/uploads/${req.user.id}/${req.file.filename}`;
      }

      await profile.save();
      res
        .status(200)
        .json({ message: "Profile updated successfully", profile });
    } catch (error) {
      console.error("Error updating or creating profile:", error);
      res.status(500).json({
        message: "Error updating or creating profile",
        error: error.message,
      });
    }
  }
);

// Route to update profile picture
profileRoute.put(
  "/profile/image",
  authenticate,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "User ID is missing from the request" });
      }

      const profile = await UserProfile.findOne({ userId });

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      // Update profile picture if a new one is uploaded
      if (req.file) {
        profile.profilePicture = `/uploads/${req.user.id}/${req.file.filename}`;
      }

      await profile.save();
      res
        .status(200)
        .json({ message: "Profile picture updated successfully", profile });
    } catch (error) {
      console.error("Error updating profile picture:", error);
      res.status(500).json({
        message: "Error updating profile picture",
        error: error.message,
      });
    }
  }
);

// Route to get user profile
profileRoute.get("/profile", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }

    const profile = await UserProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Respond with all fields of the profile
    res.json({
      profile: {
        fullName: profile.fullName || "",
        email: profile.email || "",
        contactNo: profile.contactNo || "",
        address: profile.address || "",
        city: profile.city || "",
        pincode: profile.pincode || "",
        state: profile.state || "",
        country: profile.country || "",
        dateOfBirth: profile.dateOfBirth || "",
        gender: profile.gender || "",
        profilePicture: profile.profilePicture || "", // This will be the relative URL
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

// Route to delete user profile
profileRoute.delete("/profile", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is missing from the request" });
    }

    const profile = await UserProfile.findOneAndDelete({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    res
      .status(500)
      .json({ message: "Error deleting profile", error: error.message });
  }
});

module.exports = profileRoute;
