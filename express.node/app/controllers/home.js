const express = require('express');
const router = express.Router();
const service = require('../services/home');

router.get('/', service.getHomeTitle);

module.exports = (app) => {
  app.use('/', router);
};


