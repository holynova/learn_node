const Faker = require('faker-zh-cn');
const model = require('./model');

function randNews() {
  let now = new Date();
  return {
    title: Faker.random.number(10) + Faker.Lorem.sentence(5),
    author: Faker.Name.findName(),
    content: Faker.Lorem.paragraphs(3),
  }
}

async function insertNewsToDatabase(count = 1) {
  for (let i = 0; i < count; i++) {
    await model.News.create(randNews());
  }
  console.log(`数据库新增${count}条数据`);
}

async function clearAllNews() {
  let all = await model.News.findAll();
  let len = all.length;
  // await all.destroy();
  for (let item of all) {
    await item.destroy();
  }
  console.log(`清空${len}条数据`);
}
// clearAllNews();


insertNewsToDatabase(100);
