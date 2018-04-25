'use strict';

const { set, get } = require("../../utils/redis.jdbc");


exports.index = (req, res) => {
  res.render('redis');
};


exports.set = (req, res) => {
  // 如果是对象，需要将对象编程字符串
  set("name", "zhoulexing");
  res.render('redis');
};


exports.get = async (req, res) => {
  // generator模式下获取name
  const gen = get("name").next().value;
  gen.then(value => {
    res.status(200).json(value);
  });
  /*const gen = await get("name");
  console.log(gen);*/
};
