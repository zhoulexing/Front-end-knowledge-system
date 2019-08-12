'use strict';

const { set, get, hmset, hgetall } = require("../../utils/redis.jdbc");


exports.index = (req, res) => {
  res.status(200).send('redis');
};


exports.set = (req, res) => {
  // 如果是对象，需要将对象编程字符串
  set("xm", "zhoulexing");
  set("xb", "男");
  hmset("people", { xm: "yangwanwan", xb: "女" });
  res.status(200).send('success');
};


exports.get = (req, res) => {
  /*const xm = await get("xm");
  const xb = await get("xb");
  const people = await hgetall("people");
  res.status(200).json({ xm, xb, people });*/
  hgetall('people').then(value => {
    res.status(200).json({ value });
  });
};
