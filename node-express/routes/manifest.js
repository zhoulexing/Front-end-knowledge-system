const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('manifest');
});

module.exports = (app) => {
  app.use('/manifest', router);
};


