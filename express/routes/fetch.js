const express = require('express');
const router = express.Router();
const server = require("../app/services/fetch.js");

router.get('/', (req, res) => {
  res.render('fetch');
});

router.get('/getData', (req, res) => {
  res.status(200).json({ success: true, content: 'Hello World!' });
});

router.get('/getMockData', server.getMockData);
router.get('/getEsData', server.getEsData);

module.exports = (app) => {
  app.use('/fetch', router);
};


