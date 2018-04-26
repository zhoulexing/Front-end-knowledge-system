/*const express = require('express');
const config = require('./config/config');
const db = require('./utils/mysql.jdbc');

const app = express();

module.exports = require('./config/express')(app, config);

db.sequelize
  .sync()
  .then(() => {
    if (!module.parent) {
      app.listen(config.port, () => {
        console.log('Express server listening on port ' + config.port);
      });
    }
  }).catch((e) => {
    throw new Error(e);
  });*/

const express = require('express');
const config = require('./config/config');
const redisDb = require('./utils/redis.jdbc');


const app = require('./config/express')(express(), config);


// 连接redis内存数据库
redisDb.initRedis(config.redis.ip, config.redis.port);

// 创建一个服务
app.listen(config.port, config.ip, () => {
  console.log('Express server listening on port ' + config.port);
});

module.exports = app;
