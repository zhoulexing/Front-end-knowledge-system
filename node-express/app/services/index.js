'use strict';

exports.getTitle = (req, res) => {
  res.render('index', {
    title: 'Generator-Express MVC',
    articles: "Hello"
  });
};
