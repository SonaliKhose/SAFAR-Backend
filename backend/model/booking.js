const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name:{
    type:String,
  },
  email:{
    type:String,
  },
  mobileNo:{
    type:Number,
  },
  pickupAdd:{
    type:String,
  },
  dropAdd:{
    type:String,
  },
  carType: {
    type: String,
   
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signup", // Reference to the "User" model (assuming "SignUp" is the user model)
    required: true,
  },
  tripType:{
    type:String,
    enum:["oneway","roundtrip","local","airport"],
    default:"oneway",
  },
  pickupdate: {
    type: Date,
    
  },
  returndate:{
    type:Date,
  },

  pickuptime: {
    type: String,
   
  },
  from: {
    type: String,
   
  },
  to: {
    type: String,
   
  },
  distance: {
    type: Number,
    
  },
  fare: {
    type: Number,
    
  },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending",
  },

}, {
  timestamps: true, 
});



const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = {BookingModel};
