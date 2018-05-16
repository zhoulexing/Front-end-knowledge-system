const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    redis: { // redis数据库
      ip: "127.0.0.1",
      port: 6379
    }
  },

  test: {
    root: rootPath,
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    redis: { // redis数据库
      ip: "127.0.0.1",
      port: 6379
    }
  },

  production: {
    root: rootPath,
    port: process.env.PORT || 3000,
    ip: process.env.IP || '127.0.0.1',
    redis: { // redis数据库
      ip: "127.0.0.1",
      port: 6379
    }
  }
};

module.exports = config[env];
