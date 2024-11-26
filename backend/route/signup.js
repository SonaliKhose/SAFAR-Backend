const express = require("express");
const { SignupModel } = require("../model/signup");
const bcrypt = require("bcrypt");
const route = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios"); // Import axios
const crypto = require("crypto");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

// Create an instance of the SES client
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Signup route
route.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password, gender } = req.body;
    const checkEmail = await SignupModel.findOne({ email: email });

    if (checkEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 8);

    const signupDetails = new SignupModel({
      fullName,
      email,
      password: hash,
      gender,
    });

    await signupDetails.save();

    // Include fullName in the token payload
    const token = jwt.sign(
      {
        userId: signupDetails._id,
        fullName: signupDetails.fullName,
        email: signupDetails.email,
      },
      process.env.JWT_SECRET // Use an environment variable for the secret
    );

    // Create the profile for the new user
    try {
      const profileResponse = await axios.post(
        "http://localhost:8000/profile", // Assuming /profile is the endpoint for profile creation
        {
          user_id: signupDetails._id,
          fullName: signupDetails.fullName,
          email: signupDetails.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      console.log("Profile data created:", profileResponse.data);
    } catch (profileError) {
      console.error("Error creating profile data:", profileError.message);
      return res.status(500).json({ message: "Error creating profile" });
    }

    return res.status(201).json({
      token,
      message: "SignUp successful and profile created!",
    });
  } catch (error) {
    console.error("Error in Signup:", error);
    res.status(500).json({ message: "Error in Signup" });
  }
});

// Forgot password route
route.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await SignupModel.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }

    // Generate a reset token
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Setup email options
    const mailOptions = {
      Source: process.env.EMAIL_FROM, // Verified email in SES
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Subject: {
          Data: "Password Reset Request",
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data:
              `You are receiving this because you have requested the reset of the password for your account.\n\n` +
              `Please click on the following link to complete the process:\n\n` +
              `http://localhost:3000/reset-password/${token}\n\n` +
              `If you did not request this, please ignore this email.\n`,
            Charset: "UTF-8",
          },
        },
      },
    };

    // Create the SendEmailCommand
    const command = new SendEmailCommand(mailOptions);

    // Send the email using AWS SES
    // await sesClient.send(command);
    // console.log(`Email sent to: ${user.email}`);

    const response = await sesClient.send(command);
    console.log(
      `Email sent successfully: ${JSON.stringify(response, null, 2)}`
    );
    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email." });
  } catch (error) {
    console.error("Error in sending password reset link:", error);
    res.status(500).json({ message: "Error in sending password reset link" });
  }
});

// Reset password route
route.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await SignupModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if token has expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" });
    }

    // Hash the new password before saving
    const hash = await bcrypt.hash(password, 8);
    user.password = hash;
    user.resetPasswordToken = undefined; // Clear the token
    user.resetPasswordExpires = undefined; // Clear the expiration

    await user.save();
    res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (error) {
    console.error("Error in resetting password:", error);
    res.status(500).json({ message: "Error in resetting password" });
  }
});

// Login route
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const checkEmail = await SignupModel.findOne({ email: email });

    if (!checkEmail) {
      return res.status(404).json({ message: "This Email is not registered." });
    }

    const isMatch = await bcrypt.compare(password, checkEmail.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Include fullName in the token payload
    const token = jwt.sign(
      {
        userId: checkEmail._id,
        fullName: checkEmail.fullName,
        email: checkEmail.email,
      },
      process.env.JWT_SECRET // Use an environment variable for the secret
    );

    res.status(200).json({
      token,
      message: "Login successfully!",
    });
  } catch (error) {
    console.error("Error in Login:", error);
    res.status(500).json({ message: "Error in Login" });
  }
});

module.exports = { route };
