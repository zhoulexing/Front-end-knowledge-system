const express = require('express');
const router = express.Router();
const service = require('../services/index');

router.get('/', service.getTitle);

module.exports = (app) => {
  app.use('/', router);
};


