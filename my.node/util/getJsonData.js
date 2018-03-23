var fs = require('fs'),
    q = require('q'),
    path = require('path');

/*
* 读取json文件，并将json文件的注释去掉，然后再转换成json对象
*
* @filePath : 为config下的文件夹名+json文件名
*        如: search/*.json
*
* @return : {
*               success : true/false,
*               data : 为json文件里的数据
*            }
* */
function getData(filePath) {
  filePath = path.join(__dirname,'../config',filePath);
  //创建read流
  var readerStream = fs.createReadStream(filePath),
      data = "",
      defered = q.defer();
  //设置编码
  readerStream.setEncoding('UTF-8');
  readerStream.on('data', function(chunk) {
    data += chunk;
  });

  readerStream.on('end', function() {
    //console.log("data:",data);
    //去掉所有的注释
    var _data = data.replace(/(^.*)(\/\/.*)$/mg, "$1");
    defered.resolve({success : true, data : JSON.parse(_data)});
  });

  readerStream.on('error', function(err) {
    console.log(err.stack);
    defered.resolve({success : false, data : err.stack});
  });
  return defered.promise;
}



module.exports = {
  getData : getData
}
