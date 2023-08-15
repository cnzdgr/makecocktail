const Joi = require('joi');
const mongoose = require('mongoose');

const Drink = mongoose.model('Drinks', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 150
  },
  logo: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 200
  },
  description: { 
    type: String,
    required: true,
    trim: true, 
    minlength: 10,
    maxlength: 300
  },
  tags:[String],
  ingredients: [String],
  mix: [String]

}));

function validateDrink(drink) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    logo: Joi.string().min(10).max(200).required(),
    description: Joi.string().min(10).max(100).required(),
    tags: Joi.array().items(Joi.string()).min(1).max(8),
    ingredients: Joi.array().items(Joi.string().min(2).max(70)).min(1).max(8),
    mix: Joi.array().items(Joi.string().min(2).max(200)).max(15)
  });

  return schema.validate(drink);
}

exports.Drink = Drink; 
exports.validate = validateDrink;