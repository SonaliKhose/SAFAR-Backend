const mongoose = require("mongoose");
const TravelsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      // required: true
    },
    city:{
      type:String,
    },
    state:{
      type:String,
    },
    address: {
      type: String,
    },
    availableCities: {
      type: Array,
    },
    contactNo:{
      type:String,
    },
    email:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);
const TravelsModel = mongoose.model("travel", TravelsSchema);
module.exports = { TravelsModel };
