const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('fetch');
});

router.get('/getData', (req, res) => {
  res.status(200).json({ success: true, content: 'Hello World!' });
});

module.exports = (app) => {
  app.use('/fetch', router);
};


