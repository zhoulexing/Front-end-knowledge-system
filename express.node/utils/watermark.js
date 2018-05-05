'use strict';


const qr = require('qr-image');
const images = require('images');
const fs = require('fs');
const gm = require('gm');
const imageMagick = gm.subClass({ imageMagick : true });


/*
* 根据地址生成二维码
* 参数 url(string) 地址
* 参数 callback(function)
* 参数 finalUrl(string) 最终生成的url
* */
function createQr(url, finalUrl, callback) {
  const qrPng = qr.image(url, { type: 'png', size: 6 });
  const qrPipe = qrPng.pipe(fs.createWriteStream(finalUrl));
  qrPipe.on('error', err => {
    callback(err, null);
    return;
  });
  qrPipe.on('finish', () => {
    callback(null, finalUrl);
  });
}

/*
* 给图片添加图片水印
* 参数 sourceUrl(string) 原图片路劲
* 参数 waterUrl(string) 水印图片路劲
* 参数 finalUrl(string) 最终生成的url
* 参数 callback(function)
* */
function addImgWater(sourceUrl, waterUrl, finalUrl, callback) {
  try {
    images(sourceUrl)
    .size(400)  // 等比缩放图像到400像素宽
    .draw(images(waterUrl), 70, 260) // 在原图坐标为(70, 260)上画
    .save(finalUrl, { quality: 50 }); // 图片质量为50
    callback(null, finalUrl);
  } catch (e) {
    callback(e, null);
  }
}

/*
* 给图片添加文字水印
* 参数 sourceUrl(string) 原图片路劲
* 参数 text(string) 文字
* 参数 callback(function)
* */
function addTextWater(sourceUrl, finalUrl, callback) {
  imageMagick(sourceUrl)
    .fontSize(36)
    .fill('red')
    .drawText(10, 10, 'Hello World')
    .write(finalUrl, function (err) {
      if (err) {
        callback(err, null);
        return;
      };
      callback(null, { success: true });
    });
  /*imageMagick(sourceUrl)
  .resize(150, 150, '!') //加('!')强行把图片缩放成对应尺寸150*150！
  .autoOrient()
  .write(finalUrl, function(err){
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, { success: true });
  });*/
}

module.exports = {
  createQr, addImgWater, addTextWater
};

