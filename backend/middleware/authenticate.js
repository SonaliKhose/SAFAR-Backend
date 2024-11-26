const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send("Authorization header is missing. You have to log in first.");
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send("Token is missing. You have to log in first.");
    }

    jwt.verify(token, "shhhhh", (error, decoded) => {
      if (error) {
        return res.status(401).send("You are not authorized. Invalid token.");
      }
      req.user = { id: decoded.userId }; // Make sure this is correctly set
      next();
    });
  } catch (error) {
    console.log("Error in authentication:", error);
    res.status(500).send("Error in Authentication");
  }
};

module.exports = { authenticate };
