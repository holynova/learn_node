const Koa = require('koa');
// const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const log = require('./common');
const fs = require('fs');
const controller = require('./controller');
const logger = require('koa-logger');
const model = require('./model');
const Sequelize = require('sequelize');
const config = require('./config');

const app = new Koa();




(async () => {
  let newsList = await model.News.findAll({
    where: {
      title: {
        $like: '4%'
      }
    }
  });
  log(newsList.length);

  for (let item of newsList) {
    log(item.title);
  }
})();


// app.listen(8899);
// log('app start at port 8899');