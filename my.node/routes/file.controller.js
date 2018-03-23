'use strict';

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');
var path = require('path');
var MyUtil = require('./util.js');
var _ = require('lodash');
var moment = require('moment');

exports.upload = function(req, res) {
  //生成multiparty对象，并配置上传目标路劲
  var uploadPath = path.join(__dirname, '../upload/');

  //判断是否存在upload文件夹，不存在就创建一个
  var pathIsExist = MyUtil.createDir(uploadPath);
  if(!pathIsExist) {
    //return res.status(200).json({success : false, msg : "文件上传失败"});
    return res.send("0");
  }


  var form = new multiparty.Form({uploadDir : uploadPath});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files,null,2);

    if(err || (_.isEmpty(fields) && _.isEmpty(files))) {
      //return res.json({success : false, msg : "上传失败!"});
      return res.send("0");
    }

    var inputFile = files.file[0];
    var uploadedPath = inputFile.path;
    var filenameArr = inputFile.originalFilename.split(".");
    var suffixName = filenameArr.pop();
    var newName = filenameArr.join("") + moment().format('YYYYMMDDHHmmss') + "." + suffixName;
    var dstPath =  uploadPath + newName;
    //重命名为真实文件名
    fs.rename(uploadedPath, dstPath, function(err) {
      if(err){
        console.log('rename error: ' + err);
      } else {
        console.log('rename ok');
        //res.status(200).json({success : true, msg : "上传成功!", filesMsg : filesTmp});
        return res.send("1");
      }
    });
  });

};

exports.getList = function(req, res) {
  var filesPath = path.join(__dirname, '../upload');
  if(!fs.existsSync(filesPath)) {
    return res.send("0");
  }
  var filesList = [];
  MyUtil.readFileList(filesPath, filesList);
  console.log("filesList:%j",filesList);

  res.render('file.list.ejs', {lists : filesList});
};

exports.download = function(req, res) {
  var filename = req.query.filename;
  var downloadPath = path.join(__dirname, '../upload/', filename);
  var stats = fs.statSync(downloadPath);
  if(stats) {
    res.set({
      'Content-type' : 'application/octet-stream',
      'Content-Disposition' : 'attachment; filename='+filename,
      'Content-Length' : stats.size
    });
    fs.createReadStream(downloadPath).pipe(res);
  } else {
    res.end(404);
  }
}



function Promise(fn) {
  var value = null,
      state = 'pending',
      callbacks = [];
  this.then = function(onFulfilled) {
    if(state === 'pending') {
      callbacks.push(onFulfilled);
    }
    onFulfilled(value);
  }

  function resolve(newValue) {
    value = newValue;
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        callback(value);
      });
    }, 0);
  }
  fn(resolve);
}

var p = new Promise(function(resolve) {
  setTimeout(function() {
    resolve(100);
  }, 1000);
});
p.then(function(value) {
  console.log(value);
});
