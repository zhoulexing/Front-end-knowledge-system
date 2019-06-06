const express = require('express');
const router = express.Router();
const service = require('../app/services/memory.fs.js');

router.get('/', service.setMemoryFs);

module.exports = (app) => {
  app.use('/memory.fs', router);
};
