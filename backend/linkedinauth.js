// const express = require('express');
// const passport = require('./auth.js');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 8001;

// app.use(cors());
// app.use(express.json());
// app.use(passport.initialize());

// // Test route to check server status
// app.get('/', (req, res) => {
//   try {
//     res.send("It's working..");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Route to initiate LinkedIn authentication
// app.get('/auth/linkedin', passport.authenticate('linkedin'));

// // Callback route after LinkedIn authentication
// app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
//   failureRedirect: '/auth/linkedin/failure',
//   session: false
// }), (req, res) => {
//   if (!req.user) {
//     return res.redirect('/auth/linkedin/failure');
//   }
//   const accessToken = req.user.accessToken;
//   res.redirect(`http://localhost:3000/dashboard?token=${accessToken}`);
// });

// // Route for authentication failure
// app.get('/auth/linkedin/failure', (req, res) => {
//   res.status(401).send('LinkedIn authentication failed');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;
