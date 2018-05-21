const express = require('express');
const router = express.Router();
const service = require('../app/services/download');

router.get('/', service.download);

module.exports = (app) => {
  app.use('/download', router);
};


