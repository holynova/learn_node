const Sequelize = require('sequelize');
const config = require('./config');
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

const ID_TYPE = Sequelize.BIGINT(11);
const defineModel = (name, attributes) => {
  let attrs = [];
  //对传进来的参数做处理
  for (let key in attributes) {
    let value = attributes[key];
    attrs[key] = value;
  }
  //对id主键做统一处理
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  }
  //对每个model都有的相同字段做统一处理
  attrs.created_at = {
    type: Sequelize.DATE
  }
  attrs.updated_at = {
    type: Sequelize.DATE
  }
  return sequelize.define(name, attrs, {
    timestamps: false,
    hooks: {
      beforeValidate: function (obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          // if (!obj.id) {
          //   obj.id = generateId();
          // }
          obj.created_at = now;
          obj.updated_at = now;
          // obj.version = 0;
        } else {
          obj.updated_at = Date.now();
          // obj.version++;
        }
      }
    }
  });
};


module.exports = {
  defineModel,
  sync: () => {
    sequelize.sync();
  }
};