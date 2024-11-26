const mongoose=require("mongoose");
const connection= mongoose.connect("mongodb+srv://sonalikhose600:sonalikhose@cluster0.85ajmyt.mongodb.net/loginregister");
module.exports={connection};
