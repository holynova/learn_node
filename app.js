const Koa = require('koa');
// const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const log = require('./common');
const fs = require('fs');
const controller = require('./controller');

const app = new Koa();
app.use(async (ctx, next) => {
  log(`${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.use(bodyParser());
app.use(controller());
app.listen(8899);
log('app start at port 8899');