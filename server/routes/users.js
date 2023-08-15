const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const _ = require("lodash");
var emailValidator = require("email-validator");

const express = require("express");
const router = express.Router();

const tokenGenerator = require('../helper/createToken');
const { verificationEmail, forgotPasswordEmail } = require('../helper/sendEmails');
const auth = require('../middleware/auth');
const { User, validate, validatePassword } = require("../models/user");
const { Drink } = require('../models/drink');


// To check users' data
router.get('/me', auth, async (req,res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});


//Registering the user
router.post("/", async (req, res) => {
  //Joi validation of the form body, for character limits
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check to see if the email is not already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", []]));
  //Add encryption to the password before storing in the DB
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  //Send verification email after the user is saved
  const verificationToken = tokenGenerator({email: user.email});
  const verificationLink = "https://drinks-backend.lm.r.appspot.com/api/passwords/verify?token="+ verificationToken;
  const sendMail = await verificationEmail(user.email, verificationLink);

  //Send JWT auth token to the user in the response
  const token = user.generateAuthToken();
  const msg = {payload: _.pick(user, ['_id', 'name', 'email']), jwtToken: token}

  res
  .header('x-auth-token', token)
  .header("access-control-expose-headers", "x-auth-token'")
  .send(msg);
});


//Initiate the sending of the "forgot password?" email
router.post("/forgotpassword", async (req,res) => {
  let isValidEmail = emailValidator.validate(req.body.email);
  if (isValidEmail != true) return res.status(400).send("Not a valid email address");

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not registered");

  const resetToken = tokenGenerator({email: user.email});
  const resetLink = "https://drinks-backend.lm.r.appspot.com/api/passwords/newPassword?token="+ resetToken;
  const sendMail = await forgotPasswordEmail(user.email, resetLink);
  res.sendStatus(200);
});


//Changing password by providing the old password as well
router.post("/changePassword", auth, async (req,res) => {
  const salt = await bcrypt.genSalt(10);
  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userToChange = await User.findOne({ email: req.body.email });
  const validPassword = await bcrypt.compare(req.body.oldPassword, userToChange.password);
  if (!validPassword) return res.status(400).send("Wrong old password");

  hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

  const userUpdate = await User.findOneAndUpdate(
    {email: userToChange.email},
    {
        password: hashedNewPassword
    },
    { new: true}
);

    //Still have old data for password hash, need to change in memory
    userToChange.password = hashedNewPassword;
    const token = userToChange.generateAuthToken();
    const msg = {payload: _.pick(userToChange, ['_id', 'name', 'email']), jwtToken: token}

    res
    .header('x-auth-token', token)
    .header("access-control-expose-headers", "x-auth-token'")
    .send(msg);
});


//When the user clicks like, a brief visit to .com/users/drinkname
router.get('/fav/:drinkname', auth, async (req,res) => {
  const user = await User.findById(req.user._id).select('-password');
  let newFav = req.params.drinkname;
  newFav = newFav.charAt(0).toUpperCase() + newFav.slice(1);

  let drink = await Drink.findOne({ name: newFav});
  if (!drink) return res.status(400).send("There is no cocktail with that name, sorry");

  let userFavs = user.favorites;
  if (!userFavs) return res.sendStatus(404);

  if (userFavs.includes(newFav)) {
    userFavs = userFavs.filter(function(item) {
      return item !== newFav;
  });
  } else {
  userFavs = [...userFavs, newFav];
  }

  const userUpdate = await User.findOneAndUpdate(
    {email: user.email},
    {favorites: userFavs},
    { new: true}
);
    res.sendStatus(200);
});

module.exports = router;
