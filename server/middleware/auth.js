const jwt = require("jsonwebtoken");

require('dotenv').config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

module.exports = function(req, res, next) {

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //Get decoded payload, otherwise throw exception as the token is invalid. 
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;

    //Pass req-res to the next middleware
    next();

  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
