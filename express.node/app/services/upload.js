'use strict';

const multiparty = require('multiparty');
const fs = require('fs');
const path = require('path');
const myUtil = require('../../utils');
const _ = require('lodash');
const moment = require('moment');

exports.upload = function(req, res) {
  //生成multiparty对象，并配置上传目标路劲
  const uploadPath = path.join(__dirname, '../../upload/');
  
  //判断是否存在upload文件夹，不存在就创建一个
  const pathIsExist = myUtil.createDir(uploadPath);
  if(!pathIsExist) {
    return res.status(200).json({success : false, msg : "文件上传失败"});
  }
  
  
  const form = new multiparty.Form({uploadDir : uploadPath});
  //上传完成后处理
  form.parse(req, function(err, fields, files) {
    const filesTmp = JSON.stringify(files,null,2);
    
    if(err || (_.isEmpty(fields) && _.isEmpty(files))) {
      return res.status(200).json({success : false, msg : "上传失败!"});
    }
    
    const inputFile = files.file[0];
    const uploadedPath = inputFile.path;
    const filenameArr = inputFile.originalFilename.split(".");
    const suffixName = filenameArr.pop();
    const newName = filenameArr.join("") + moment().format('YYYYMMDDHHmmss') + "." + suffixName;
    const dstPath =  uploadPath + newName;
    //重命名为真实文件名
    fs.rename(uploadedPath, dstPath, function(err) {
      if(err){
        return res.status(200).json({success : false, msg : "文件重命名失敗!"});
      } else {
        res.status(200).json({success : true, msg : "上传成功!", filesMsg : filesTmp});
      }
    });
  });
  
};

exports.getList = function(req, res) {
  const filesPath = path.join(__dirname, '../upload');
  if(!fs.existsSync(filesPath)) {
    return res.send("0");
  }
  const filesList = [];
  myUtil.readFileList(filesPath, filesList);
  console.log("filesList:%j",filesList);
  
  res.render('file.list.ejs', {lists : filesList});
};


