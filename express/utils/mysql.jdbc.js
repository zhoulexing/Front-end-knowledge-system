const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/index');
const db = {};

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, config.mysql.params);
const modelPath = path.join(__dirname, "../app/models");

fs.readdirSync(modelPath)
.filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
.forEach((file) => {
  const model = sequelize['import'](path.join(modelPath, file));
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
