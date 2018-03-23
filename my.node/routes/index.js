var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.ejs');
});

router.get('/debug', function(req, res) {
  res.render('debug.ejs');
});



module.exports = router;
