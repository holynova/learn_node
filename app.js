const Koa = require('koa');
// const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const log = require('./common');
const fs = require('fs');
const logger = require('koa-logger');
const model = require('./model');
const Sequelize = require('sequelize');
// const config = require('./config');
const controller = require('./controller');

const app = new Koa();
app.use(logger());
app.use(bodyParser());
app.use(controller());

// (async () => {
//   let newsList = await model.News.findAll({
//     where: {
//       title: {
//         $like: '4%'
//       }
//     }
//   });
//   log(newsList.length);

//   for (let item of newsList) {
//     log(item.title);
//   }
// })();


app.listen(8899);
// log('app start at port 8899');