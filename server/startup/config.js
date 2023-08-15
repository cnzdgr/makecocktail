//Gets the JWT Private Key from the env
require('dotenv').config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

module.exports = function() {
  if (!jwtPrivateKey) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
  }
}