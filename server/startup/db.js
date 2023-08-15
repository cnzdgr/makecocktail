const mongoose = require('mongoose');
require('dotenv').config();
const dbURL = process.env.DATABASE_URL;

module.exports = function () {
    mongoose.connect(dbURL);

}
