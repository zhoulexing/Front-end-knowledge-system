const path = require('path');
const rootPath = path.normalize(__dirname + '/..');

const index = {
  viewEngine: 'ejs',
  env: process.env.NODE_ENV || 'development',
  root: rootPath,
  app: {
    name: 'express-node'
  },
  port: process.env.PORT || 3000,
  ip: process.env.IP || '127.0.0.1',
  mysql: { // mySql数据库
    database: "express_node",
    username: "root",
    password: "342901",
    params: {
      dialect: "mysql",
      host: "localhost",
      port: 3306
    }
  },
  redis: { // redis数据库
    ip: "127.0.0.1",
    port: 6379
  },
  mongodb: {
    url: "mongodb://10.127.234.245/middle-dispatch",
    options: {
      db: {
        safe: true
      }
    }
  }
};

module.exports = index;
