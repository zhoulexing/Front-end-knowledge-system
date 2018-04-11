const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/article', (req, res, next) => {
  db.Article.findAll().then((articles) => {
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
});

module.exports = (app) => {
  app.use('/', router);
};
