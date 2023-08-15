require('dotenv').config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  verified: {
    type: Boolean,
    default: false
  },
  favorites: {
    type: [String],
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
},
{
  timestamps: true
});


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    jwtPrivateKey
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
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

  return schema.validate(user);
}

function validatePasswordChange(password) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    oldPassword: Joi.string()
      .min(5)
      .max(255)
      .required(),
    newPassword: Joi.string()
      .min(5)
      .max(255)
      .required(),
  });

  return schema.validate(password);
}


exports.User = User;
exports.validate = validateUser;
exports.validatePassword = validatePasswordChange;
