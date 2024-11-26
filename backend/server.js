//server.js
const express = require("express");
const { connection } = require("./config.js");
const { route } = require("./route/signup.js");
const cors = require("cors");

const session = require("express-session");
const app = express();
const PORT = 8000;
const { carRoutes } = require("./route/car.js");
const {travelsRoutes} = require('./route/travels.js');
const { bookingRoute } = require("./route/booking.js");
const profileRoute=require("./route/userProfile.js")
const CitiesRoute = require("./route/cities.js");
const SocialProfile=require("./route/socialProfile.js")
const SocialSignin=require("./route/socialSignin.js")

const path = require('path');

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: "your-session-secret",
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  try {
    res.send("Its working..");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});



// Define routes

app.use("/", route);

app.use('/',carRoutes);
app.use("/",travelsRoutes);
app.use("/",bookingRoute)
app.use('/', profileRoute);
app.use('/',CitiesRoute)
app.use("/", SocialProfile);
app.use("/",SocialSignin)

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
});
