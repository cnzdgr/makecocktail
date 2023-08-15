const Joi = require('joi');
const bcrypt = require("bcrypt");
const _ = require("lodash");

const express = require("express");
const router = express.Router();

const {User} = require("../models/user");


router.post("/", async (req, res) => {
  //Joi validation
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check to see if the email is not already registered
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  //Create JWT payload, create your token, send to the client
  const token = user.generateAuthToken();
  res.json({
    message: "Token creation is successful",
    token
  });
});

// JOI validation for request
function validate(req) {
    const schema = Joi.object({
      email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
      password: Joi.string()
        .min(5)
        .max(255)
        .required()
    });
  
    return schema.validate(req);
  }

module.exports = router;
