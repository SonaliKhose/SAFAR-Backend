const express = require("express");
const { BookingModel } = require("../model/booking");
const { authenticate } = require("../middleware/authenticate");
const bookingRoute = express.Router();

bookingRoute.post("/booking",authenticate, async (req, res) => {
  try {
    const {
      name,
      email,
      mobileNo,
      pickupAdd,
      dropAdd,
      tripType,
      carType,
      from,
      to,
      user,
      pickupdate,
      returndate,
      pickuptime,
      bookingStatus,
      distance,
      fare,
    } = req.body;
    const booking = new BookingModel({
      name,
      email,
      mobileNo,
      pickupAdd,
      dropAdd,
      tripType,
      carType,
      from,
      to,
      user,
      pickupdate,
      returndate,
      pickuptime,
      bookingStatus,
      distance,
      fare,
    });

    const bookingData = await booking.save();
    res.send({ message: "Booking Successfully", bookingData });
  } catch (error) {
    console.log(error.message);
    res.json("Error in Booking");
  }
});
module.exports = { bookingRoute };
