const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-node'
    },
    port: process.env.PORT || 3000,
    db: {
      database: "express_node",
      username: "root",
      password: "342901",
      params: {
        dialect: "mysql",
        host: "localhost",
        port: 3306
      }
    }
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-node'
    },
    port: process.env.PORT || 3000,
    db: {
      database: "express_node",
      username: "root",
      password: "342901",
      params: {
        dialect: "mysql",
        host: "localhost",
        port: 3306
      }
    }
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-node'
    },
    port: process.env.PORT || 3000,
    db: {
      database: "express_node",
      username: "root",
      password: "342901",
      params: {
        dialect: "mysql",
        host: "localhost",
        port: 3306
      }
    }
  }
};

module.exports = config[env];
