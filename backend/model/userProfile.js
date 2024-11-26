const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required:false,
},
email:{
    type:String,
    required:false,
},
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to signup collection
    ref: "Signup",
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  contactNo:{
    type:Number,
    required:false
},
address:{
    type:String,
    required:false,
},
city:{
    type:String,
    required:false,
},
pincode:{
  type:Number,
  required:false,
},
state:{
    type:String,
    required:false,
},
country:{
    type:String,
    required:false,
},
  profilePicture: {
    type: String, // Store the path to the uploaded file
    required: false,
  },
  
},
{
  timestamps:true
});

const UserProfile = mongoose.model("UserProfile", UserProfileSchema);

module.exports = UserProfile;