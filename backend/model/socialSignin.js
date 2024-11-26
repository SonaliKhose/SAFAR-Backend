const mongoose = require("mongoose");

const socialSigninSchema = new mongoose.Schema({
  social_id: {
    type: String, // Social ID provided by Google or Facebook
    required: true
  },
  social_name: {
    type: String, // Social profile name (from Google or Facebook)
    required: true
  },
  social_email: {
    type: String, // Social email (from Google or Facebook)
    required: true
  },
  provider: {
    type: String, // The provider (Google, Facebook, etc.)
    required: true
  },
  access_token: {
    type: String, // OAuth access token from the provider
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const SocialSignin = mongoose.model("SocialSignin", socialSigninSchema);

module.exports = SocialSignin;
