const db = require('../db');
const Sequelize = require('sequelize');

const News = db.defineModel('news', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  content: Sequelize.TEXT,
});

module.exports = News;
