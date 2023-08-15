const express = require('express');

const auth = require('../routes/auth');
const users = require('../routes/users');
const passwords = require('../routes/passwords');
const drinks = require('../routes/drinks');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/users', users);
  app.use('/api/passwords', passwords);
  app.use('/api/drinks', drinks);
}