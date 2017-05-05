const log = require('../common');

const fn_test = async (ctx, next) => {
  ctx.cookies.set('name', 'Jerry');
  // log('cookies -------->', ctx.cookies.get('name'));
  ctx.response.body = `cookies = ${ctx.cookies.get('name')}`;
  // ctx.throw(403, 'test');
};

module.exports = {
  'GET /test': fn_test,
};