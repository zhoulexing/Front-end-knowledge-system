const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';
const viewEngine = 'ejs';

const config = {
  development: {
    viewEngine: viewEngine,
    root: rootPath,
    app: {
      name: 'express-node'
    },
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    db: { // mySql数据库
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
    }
  },

  test: {
    viewEngine: viewEngine,
    root: rootPath,
    app: {
      name: 'express-node'
    },
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    db: {
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
    }
  },

  production: {
    viewEngine: viewEngine,
    root: rootPath,
    app: {
      name: 'express-node'
    },
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    db: {
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
    }
  }
};

module.exports = config[env];
