GITHUB_CLIENT_ID = "Ov23linCOZO8Th8kUbnN";
GITHUB_SECRET_KEY = "a2499da7686704b56dc570348609f4ade2d0a770";
const express = require("express");
const githubRoute = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

githubRoute.get('/auth/github', async (req, res) => {
    try {
      const { code } = req.query;
      const accessTokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_SECRET_KEY,
            code,
          }),
        }
      );
  
      const accessTokenData = await accessTokenResponse.json();
      if (!accessTokenData.access_token) {
        throw new Error('Failed to retrieve access token');
      }
  
      const token = accessTokenData.access_token;
      console.log(token);
  
      const userDetailsResponse = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const userDetails = await userDetailsResponse.json();
      console.log(userDetails);
      if(token){
        res.redirect(`http://localhost:3000/dashboard?token=${token}`);
      }
      else{
        res.redirect(`http://localhost:3000/login`);
      }
      
    } catch (err) {
      console.error(err);
      res.status(500).send('Authentication failed');
    }
  });
module.exports = { githubRoute };
