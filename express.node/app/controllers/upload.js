const express = require('express');
const router = express.Router();
const service = require('../services/upload');

router.post('/upload', service.upload);

module.exports = (app) => {
  app.use('/', router);
};


