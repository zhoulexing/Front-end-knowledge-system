const express = require('express');
const router = express.Router();

router.get('/socket', (req, res) => {
  res.render('socket');
});

module.exports = (app) => {
  app.use('/', router);
};


