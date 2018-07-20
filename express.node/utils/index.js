'use strict';

const fs = require("fs");
const path = require("path");
const uuid = require("node-uuid");

/*
* 获取某个路径下所有的文件
* @path 路径
* @filesList 存放文件信息的数组
* */
exports.readFileList = function(path, filesList) {
  const files = fs.readdirSync(path);
  //console.log("files:%j",files);
  files.forEach(function(itm, index) {
    const obj = {};
    obj.path = path;
    obj.filename = itm;
    filesList.push(obj);
  });
}

/*
* 在此项目下创建一层目录
* */
exports.createDir = function(dirpath) {
  if(!fs.existsSync(dirpath)) {
    const isExist = fs.mkdirSync(dirpath);
    if(!isExist) {
      return fs.existsSync(dirpath);
    }
  }
  return true;
}

/*
* 创建多层文件夹（同步）
* */
exports.createMoreDir = function(dirpath) {
  if(!fs.existsSync(dirpath)) {
    let pathtmp;
    dirpath.split(path.sep).forEach(function(dirname) {
      if(pathtmp) {
        pathtmp = path.join(pathtmp, dirname);
      } else {
        pathtmp = dirname;
      }
      
      if(!fs.existsSync(pathtmp)) {
        if(!fs.mkdirSync(pathtmp)) {
          return false;
        }
      }
    });
    return true;
  }
}

/*
* 生成唯一的uuid
* */
exports.createUuidOnlyOne = function () {
  return uuid.v4();
}

/*
* 根据时间戳生成惟一标识符
* */
exports.createUuidByTime = function () {
  return uuid.v1();
}
