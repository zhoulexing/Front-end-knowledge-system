const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render("serviceWorker", {
    title: 'Generator-Express MVC',
    articles: "ServiceWorker"
  });
});

module.exports = (app) => {
  app.use('/serviceWorker', router);
};


