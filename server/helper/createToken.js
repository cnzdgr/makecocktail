const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;

module.exports = (data) => {
    return jwt.sign(data, jwtPrivateKey, {expiresIn: '5d'});
}