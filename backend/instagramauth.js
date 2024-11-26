// instagramauth.js

const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const passport = require('passport');
const InstagramStrategy = require('passport-instagram').Strategy;

const INSTAGRAM_CLIENT_ID = '3416172612010085';
const INSTAGRAM_CLIENT_SECRET = '560f677c8737db52615525efad637e0a';

const instagramRoute = express.Router();

passport.use(new InstagramStrategy({
    clientID: INSTAGRAM_CLIENT_ID,
    clientSecret: INSTAGRAM_CLIENT_SECRET,
    callbackURL: "https://localhost:8000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Handle Instagram login
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

instagramRoute.get('/auth/instagram',
  passport.authenticate('instagram'));

instagramRoute.get('/auth/instagram/callback',
  passport.authenticate('instagram', {
    failureRedirect: '/auth/instagram/failure',
    session: false
  }),
  (req, res) => {
    const accessToken = req.user.accessToken;
    res.redirect(`http://localhost:3000/dashboard?token=${accessToken}`);
  });

module.exports = instagramRoute;
