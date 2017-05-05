// const log = require('../common');
const fs = require('fs');
const fn_index = async (ctx, next) => {
  // ctx.response.body = require('../views/index.html');
  // ctx.body = await fs.readFile('./views/index.html');
  // let html = await fs.readFileSync('./views/index.html');
  ctx.body = `
  <!DOCTYPE html>
<html lang="en">

<head>
  <title></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--<link href="css/style.css" rel="stylesheet">-->
</head>

<body>
<img src="./imgs/1.jpg" alt="1.jpg">

  <h1>用户登录</h1>
  <form action="/login" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input name="password" type="password"></p>
    <p><input type="submit" value="登录"></p>
  </form>

  <h1>新用户注册</h1>
  <form action="/signin" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input name="password" type="password"></p>
    <p><input type="submit" value="注册"></p>
  </form>
</body>

</html>
  `;
};
const fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  console.log(`用户名${name},密码${password}`);
  if (password === 'sang') {
    ctx.response.body = `<h2>登陆成功,欢迎${name}回来</h2>`;
  } else {
    ctx.response.body = `<p>登陆失败 <a href="/">重新登陆</a></p>`;
  }
};
const fn_login = async (ctx, next) => {

};

module.exports = {
  'GET /': fn_index,
  'POST /signin': fn_signin,
  'POST /login': fn_login,
};
