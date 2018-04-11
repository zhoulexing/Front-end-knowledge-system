'use strict';

exports.getHomeTitle = (req, res) => {
  res.render('home', {
    title: 'Generator-Express MVC',
    articles: "Hello"
  });
};
