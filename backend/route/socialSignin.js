const express = require("express");
const router = express.Router();
const SocialSignin = require("../model/socialSignin");
const axios = require("axios"); // Import axios

// Create or update a social sign-in entry when a user logs in with Google/Facebook

router.post("/social-signin", async (req, res) => {
  try {
    const { social_id, social_name, social_email, provider, access_token } = req.body;

    // Check if the user with the same social_email and provider already exists
    let existingUser = await SocialSignin.findOne({ social_email, provider });

    if (existingUser) {
      // If user exists, update the details (no profile creation here)
      existingUser.social_id = social_id;  // Update social_id if necessary
      existingUser.social_name = social_name;
      existingUser.access_token = access_token;

      const updatedSignin = await existingUser.save();
      console.log("User updated:", updatedSignin);

      res.status(200).json({ message: "User updated", data: updatedSignin });

    } else {
      // If user doesn't exist, create a new entry
      const socialSignin = new SocialSignin({
        social_id,
        social_name,
        social_email,
        provider,
        access_token,
      });

      const savedSignin = await socialSignin.save();
      console.log("User created:", savedSignin);

      // Create the profile for the new user (only on the first login)
      try {
        const profileResponse = await axios.post(
          "http://localhost:8000/social-profile",
          {
            user_id: savedSignin._id,
            fullName: savedSignin.social_name,
            email: savedSignin.social_email,
            provider: savedSignin.provider,
          }
        );
        console.log("Profile data created:", profileResponse.data);
      } catch (profileError) {
        console.error("Error creating profile data:", profileError.message);
      }

      res.status(201).json({ message: "User created and profile created", data: savedSignin });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




// Fetch all social sign-in entries
router.get("/social-signin", async (req, res) => {
  try {
    const signinRecords = await SocialSignin.find();
    res.json(signinRecords);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
