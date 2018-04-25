"use strict";

const express = require('express');
const router = express.Router();
const service = require('../services/redis');

router.get('/', service.index);
router.get('/set', service.set);
router.get('/get', service.get);

module.exports = (app) => {
  app.use('/redis', router);
};
