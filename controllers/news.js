
const model = require('../model');

/**
 * 
 * 
 * @param {any} ctx 
 * @param {any} next 
 */
const news = async (ctx, next) => {
  let { newsType = 0, pageNo = 0, pageSize = 5 } = ctx.request.query;
  console.log(ctx.request.query);
  ctx.response.type = 'text/json';
  let newsList = await model.News.findAll({
    attributes: ['id', 'title', 'author', 'updated_at'],
    offset: parseInt(pageNo) * parseInt(pageSize),
    limit: parseInt(pageSize)
  });
  ctx.response.body = {
    code: 0,
    data: {
      newsType: newsType,
      pageNo: pageNo,
      pageSize: pageSize,
      total: 100,
      results: newsList
    }
  }
};
const newsById = async (ctx, next) => {
  let id = ctx.params.id;
  let result = await model.News.find({
    where: {
      id: id
    }
  });
  if (result) {
    ctx.response.body = result;
  } else {
    ctx.response.status = 404;
  }
};


module.exports = {
  'GET /api/news': news,
  'GET /api/news/:id': newsById,
};