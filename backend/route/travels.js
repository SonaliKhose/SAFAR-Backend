const express = require("express");
const travelsRoutes = express.Router();
const { TravelsModel } = require("../model/travels");
const { CarModel } = require("../model/car");

travelsRoutes.get("/view-travels", async (req, res) => {
  try {
    const travels = await TravelsModel.find();
    res.status(200).send(travels);
  } catch (error) {
    console.log(err);
    res.status(400).json({ error: "Error in View Travels" });
  }
});
// Create a new travel agency
travelsRoutes.post("/travelagency-post", async (req, res) => {
  try {
    const { name, address, logo, city, state, contactNo, email } = req.body;
    const travelAgency = await TravelsModel.insertMany(req.body);
    // await travelAgency.save();
    res.status(201).json(travelAgency);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

travelsRoutes.post("/travels-car-post", async (req, res) => {
  try {
    const { travelAgencyId, rating, cartype, price, image, no_plate } =
      req.body;

    const carData = await CarModel.insertMany(req.body);
    res.status(201).send({ message: "Cars successfully inserted", carData });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error inserting cars", error });
  }
});
travelsRoutes.get("/viewcars/:travelId", async (req, res) => {
  try {
    const { travelId } = req.params;
    console.log(travelId)
    const cars = await CarModel.find({ travelAgencyId: travelId });
    res.status(200).json(cars);
  } catch (error) {
    console.log(error);
  }
});
module.exports = { travelsRoutes };
