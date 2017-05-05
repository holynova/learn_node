const db = require('../db');
const Sequelize = require('sequelize');

const User = db.defineModel('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  salt: Sequelize.STRING,
});

module.exports = User;
