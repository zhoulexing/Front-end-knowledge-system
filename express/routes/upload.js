const express = require('express');
const router = express.Router();
const service = require('../app/services/upload');

router.post('/', service.upload);

module.exports = (app) => {
  app.use('/upload', router);
};


