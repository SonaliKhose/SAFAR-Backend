const mongoose=require("mongoose");
const SignupSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
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
    state:{
        type:String,
        required:false,
    },
    country:{
        type:String,
        required:false,
    },
    birthDate:{
        type:Date,
        required:false,
    },
    gender:{
        type:String,
        required:false,
    },
    pincode:{
        type:Number,
        required:false,
    },
    resetPasswordToken: {
        type: String,
        required: false,
      },
      resetPasswordExpires: {
        type: Date,
        required: false,
      },
      verificationToken: String, // Add field for verification token
      isVerified: { type: Boolean, default: false }, // Add field to track verification status
},
{
    timestamps:true
}

)
const SignupModel=mongoose.model("SignUp",SignupSchema);
module.exports={SignupModel};