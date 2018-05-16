const express = require('express');
const router = express.Router();
const service = require('../services/upload');

router.post('/', service.upload);

module.exports = (app) => {
  app.use('/upload', router);
};


