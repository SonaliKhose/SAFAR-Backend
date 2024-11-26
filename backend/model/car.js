const mongoose=require("mongoose");
const CarsSchema=mongoose.Schema({
    no_plate: 
    { 
        type: String, 
        //required: true, 
    },
    image:
     { 
        type:String, 
        //required: true 
    },
    cartype: {
         type:String, 
        // required: true
         }
        ,
   
     price:{
        type:Number,
    },
    rating:{
        type:Number,
    },
    travelAgencyId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Travel', 
        required: true },

        
    },
{
    timestamps:true
}

)
const CarModel=mongoose.model("Cars",CarsSchema);
module.exports={CarModel};