var express = require('express');
var router = express.Router();

var FileCtrl = require('./file.controller.js');

/* GET home page. */

router.post('/upload', function(req, res) {
  FileCtrl.upload(req, res);
});

router.get('/list', function(req, res) {
  FileCtrl.getList(req, res);
});

router.get('/download', function(req, res) {
  FileCtrl.download(req, res);
});


router.post('/test', function(req, res) {
  console.log("params--->", req.body.params);
  return res.status(200).json({success : true});
});

module.exports = router;
