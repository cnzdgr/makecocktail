const jwt = require("jsonwebtoken");
var generator = require('generate-password');
const bcrypt = require("bcrypt");
var emailValidator = require("email-validator");
const _ = require("lodash");

const express = require("express");
const router = express.Router();

require('dotenv').config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;
const { User, validate } = require("../models/user");


//Change the "verified" status of the user to "true" once clicked to the email
router.get("/verify", async (req,res) => {
    const token = req.query.token;              //Query:token includes the user information
    const decoded = jwt.verify(token, jwtPrivateKey);
    let user = await User.findOne({ email: decoded.email });

    const userToUpdate = await User.findOneAndUpdate(
        {email: user.email},
        {verified: true},
        {new: true}
    );

    if(userToUpdate.verified === true) {
        res.status(201).json({
          success: true,
          msg:"Verification completed"
        });
    }
});


//Give the user a new password. Not secure, user needs to change it.
router.get("/newPassword", async (req,res) => {

    const token = req.query.token;
    const decoded = jwt.verify(token, jwtPrivateKey);

    let isValidEmail = emailValidator.validate(decoded.email);
    if (isValidEmail != true) return res.status(400).send("Not a valid email address");

    let user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(400).send("User not registered");

    //Creating a new password for the user, to be sent to the user
    const password = generator.generate({
        length: 10,
        numbers: true
    }); 

    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);

    const userToUpdate = await User.findOneAndUpdate(
        {email: user.email},
        {password: hashedPassword},
        {new: true}
    );


    //Sending back the password, to be shown to the user 1 time with security recommendation of changing it.
    //res.header('x-auth-token', token).send(password);
    res.render('newPassword', {
        user: userToUpdate,
        password: password
    });
});


module.exports = router;

