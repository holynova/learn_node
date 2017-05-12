const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(`${__dirname}/models`);
let js_files = files.filter(f => f.endsWith('.js'));

module.exports = {};
for (let f of js_files) {
  f = f.replace('.js', '');
  module.exports[f] = require(`${__dirname}/models/${f}`);
  console.log(`model.js :注册了model:${f}`);
}
module.exports.sync = () => {
  db.sync();
}