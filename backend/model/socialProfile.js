const mongoose = require("mongoose");

const socialProfileSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,  // Reference type for MongoDB ObjectID
    ref: "SocialSignin",  // Reference the 'SocialSignin' collection
    required: true
  },
  fullName: {
    type: String,
   // required: true
  },
 
  city: {
    type: String,
    //required: true
  },
  contactNo: {
    type: Number,
    //required: true
  },
  email: {
    type: String,
    required: false
  },
  address: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
   
  },
  pincode: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  profilePicture: {
    type: String // URL to the profile picture
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const SocialProfile = mongoose.model("SocialProfile", socialProfileSchema);

module.exports = SocialProfile;
