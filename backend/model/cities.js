// models/City.js

const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true
     },
});

const Cities = mongoose.model('City', citySchema);
module.exports = Cities;
