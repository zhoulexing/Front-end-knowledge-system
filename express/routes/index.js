const express = require('express');
const router = express.Router();
const service = require('../app/services/index');

router.get('/', service.getTitle);

module.exports = (app) => {
  app.use('/', router);
};


