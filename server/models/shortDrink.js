const Joi = require('joi');
const mongoose = require('mongoose');

const ShortDrink = mongoose.model('ShortDrinks', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 150
  },
  tags:[String],
}));

function validateShortDrink(ShortDrink) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    tags: Joi.array().items(Joi.string()).min(1).max(8),
  });

  return schema.validate(drink);
}

exports.ShortDrink = ShortDrink; 
exports.validateShort = validateShortDrink;