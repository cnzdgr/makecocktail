const express = require('express');
require('dotenv').config();
const jwtPrivateKey = process.env.JWTPRIVATEKEY;
const dbURL = process.env.DATABASE_URL;
const port = process.env.PORT;
const authReq = process.env.REQUIRES_AUTH;
const googlePassword = process.env.GOOGLE_PASSWORD;
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
app.disable('x-powered-by');
app.set('view engine', 'ejs');


const server = app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
module.exports = server;


