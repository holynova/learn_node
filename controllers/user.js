const model = require('../model');
const crypto = require('crypto');
const SECRET_KEY = require('../constance').SECRET_KEY;
const login = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  let results = await model.User.findAll({
    where: {
      username: username
    }
  });
  if (results.length === 0) {
    response.body = {
      code: 3,
      message: '用户名不存在'
    }
  } else {
    let salt = results[0].salt;
    let dbPassword = results[0].password;
    if ()
  }

  if (await (isUserExist(username))) {


  } else {

  }


};
const genSalt = (len = 10) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  if (len <= 0 || typeof len != 'number') {
    len = 10;
  };
  let salt = '';
  for (let i = 0; i < len; i++) {
    salt += chars[Math.floor(Math.random() * 62)];
  }
  return salt;

};
const getMixedPassword = (password, salt) => {
  let hmac = crypto.createHmac('md5', SECRET_KEY);
  hmac.update(password + salt);
  return hmac.digest('hex');
}
const signIn = async (ctx, next) => {
  // console.log('request', ctx.request);
  const { username, password } = ctx.request.body;
  // const [username, password] = ['sang', 'sang'];
  console.log('username, password', username, password);
  const salt = genSalt(10);
  let hmac = crypto.createHmac('md5', SECRET_KEY);
  hmac.update(password);
  let dbPassword = hmac.digest('hex');
  //检查用户名是否存在
  // let isExisted = false;
  if (await isUserExist(username)) {
    ctx.response.body = {
      code: 1,
      message: '用户名已经存在'
    };
  } else {
    await model.User.create({
      username: username,
      password: dbPassword,
      salt: salt
    });

    ctx.response.body = {
      code: 0,
      data: {
        username: username
      }
    };
    // ctx.response.body = {
    //   code: 0,
    //   data: {
    //     username: 'test'
    //   }
    // };

  }
};
const isUserExist = async (username) => {
  let results = await model.User.findAll({ where: { username: username } });
  if (results.length === 0) {
    return false;
  } else {
    return true;
  }
};

const hasUser = async (ctx, next) => {
  const username = ctx.request.query.username;
  if (typeof username === 'undefined') {
    response.body = {
      code: 2,
      message: '没有传入用户名'
    }
  } else {
    if (await isUserExist(username)) {
      response.body = {
        code: 2,
        message: '用户名已存在'
      }
    } else {
      response.body = {
        code: 0,
        message: 'ok',
      }
    }

  }

};


module.exports = {
  'POST /api/login': login,
  'POST /api/signIn': signIn,
  'GET /api/hasUser': hasUser,
}