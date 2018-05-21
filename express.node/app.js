const express = require('express')();
const config = require('./config/config');
const redisDb = require('./utils/redis.jdbc');


const app = require('./config/express')(express, config);


// 连接redis内存数据库
redisDb.initRedis(config.redis.ip, config.redis.port);

// 创建一个服务
app.listen(config.port, config.ip, () => {
  console.log(`Express server listening on ${ config.ip }:${ config.port } `);
});

module.exports = app;
