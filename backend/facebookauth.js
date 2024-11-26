const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = '489409150350509';
const FACEBOOK_APP_SECRET = 'bfb3bb5166f695a2542369eb9ad6b5e3';

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:8000/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name'] // Adjust the fields as necessary
},
function(accessToken, refreshToken, profile, done) {
  // Handle Facebook login
  console.log('Access Token:', accessToken);
  console.log('Profile:', profile);
  return done(null, { accessToken });
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
