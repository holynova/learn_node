const log = require('../common');
const fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>
    `;
};
const fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  log(`用户名${name},密码${password}`);
  if (password === 'sang') {
    ctx.response.body = `<h2>登陆成功,欢迎${name}回来</h2>`;
  } else {
    ctx.response.body = `<p>登陆失败 <a href="/">重新登陆</a></p>`;
  }
};

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin
};
