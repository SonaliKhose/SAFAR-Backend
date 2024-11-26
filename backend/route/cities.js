// routes/cities.js

const express = require('express');
const CitiesRoute = express.Router();
const City = require('../model/cities'); // Assume City is your city model in MongoDB

// Get cities by search query (GET method)
CitiesRoute.get('/cities', async (req, res) => {
  try {
    const { search } = req.query;
 //   console.log(`Search query: ${search}`); // Log the search query
    const regex = new RegExp(search, 'i'); // Case insensitive search
    const cities = await City.find({ name: regex }); // Search cities by name
   // console.log(`Found cities: ${cities.length}`); // Log the number of cities found
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error); // Log the error
    res.status(500).json({ message: "Server error" });
  }
});



// Add a new city to the database (POST method)
CitiesRoute.post('/cities', async (req, res) => {
    try {
      const { cities } = req.body;
  
      if (!Array.isArray(cities) || cities.length === 0) {
        return res.status(400).json({ message: "Invalid input: 'cities' should be a non-empty array" });
      }
  
      // Insert cities in bulk
      const result = await City.insertMany(cities, { ordered: false });
      res.status(201).json({ message: "Cities added successfully", result });
    } catch (error) {
      console.error('Error inserting cities:', error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

module.exports = CitiesRoute;
