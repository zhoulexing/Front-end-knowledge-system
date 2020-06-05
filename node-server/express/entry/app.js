const app = require('express')();
const config = require('../config/index');
const redisDb = require('../utils/redis.jdbc');
const { connect } = require('../utils/websocket');

// 创建websocket, 必须放在app上面
connect(app);

// 连接redis内存数据库
//redisDb.initRedis(config.redis.ip, config.redis.port);

require('../config/express')(app, config);

// 创建一个服务
app.listen(config.port, config.ip, () => {
  console.log(`Express server listening on ${ config.ip }:${ config.port } `);
});

module.exports = app;
