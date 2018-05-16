const express = require('express');
const router = express.Router();
const service = require('../services/download');

router.get('/', service.download);

module.exports = (app) => {
  app.use('/download', router);
};


