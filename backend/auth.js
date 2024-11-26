// const passport = require("passport");
// require("dotenv").config();
// var GoogleStrategy = require("passport-google-oauth2").Strategy;

// //Google
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/google/callback",
//       passReqToCallback: true,
//     },
//     //http://localhost:8000/auth/google/callback
//     function (request, accessToken, refreshToken, profile, done) {
//       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       //   return done(err, user);
//       // });
//       console.log("Google",profile);
//       return done(null, { accessToken });
//     }
//   )
// );

// //LinkedIn

// const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
// passport.use(
//   new LinkedInStrategy(
//     {
//       clientID: process.env.LINKEDIN_CLIENT_ID,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/linkedin/callback",
//       scope: ["openid", "profile", "email"],
//       state: true,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Handle user profile
//       return done(null, profile);
//     }
//   )
// );

// // Facebook

// const FacebookStrategy = require("passport-facebook").Strategy;

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/facebook/callback",
//       profileFields: ["id", "emails", "name"],
//     },
//     function (accessToken, refreshToken, profile, done) {
//       console.log("Access Token:", accessToken);
//       console.log("Profile:", profile);
//       return done(null, { accessToken });
//     }
//   )
// );

// //Instagram
// const InstagramStrategy = require("passport-instagram").Strategy;

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: process.env.INSTAGRAM_CLIENT_ID,
//       clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
//       callbackURL: "http://localhost:8000/auth/instagram/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       console.log("Instagram Profile:", profile);
//       return done(null, { accessToken });
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// module.exports = passport;
