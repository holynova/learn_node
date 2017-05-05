const fs = require('fs');
const log = require('./common');
const addMapping = (router, mapping) => {
  for (let url in mapping) {
    if (url.startsWith('GET')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      log(`注册了${url}`);
    } else if (url.startsWith('POST')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      log(`注册了${url}`);
    } else {
      lg(`无效的url${url}`);
    }
  }
};

const addControllers = (router, dir) => {
  log(`${__dirname}/${dir}`);
  let files = fs.readdirSync(`${__dirname}/${dir}`);
  let js_files = files.filter((f) => {
    return f.endsWith('.js');
  })
  for (let f of js_files) {
    let mapping = require(`${__dirname}/${dir}/${f}`);
    addMapping(router, mapping);
  }
};

module.exports = (dir = 'controllers') => {
  const router = require('koa-router')();
  addControllers(router, dir);
  return router.routes();
}