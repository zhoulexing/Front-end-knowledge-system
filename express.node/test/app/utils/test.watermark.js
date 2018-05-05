'use strict';

const co = require('co');
const util = require('../../../utils/watermark');
const q = require('q');
const path = require('path');


/*co(function*() {
  const waterUrl = yield task1();
  const result = yield task2(waterUrl);
  console.log(result);
});*/
test3();

function task1() {
  const deferred = q.defer();
  const url = 'http://www.baidu.com';
  const finalUrl = path.join(__dirname, `../../../public/images/qr.code.png`);
  util.createQr(url, finalUrl, (err, data) => {
    if(err) {
      deferred.reject(err);
      return;
    }
    deferred.resolve(data);
  });
  return deferred.promise;
}

function task2(waterUrl) {
  const deferred = q.defer();
  const sourceUrl = path.join(__dirname, '../../../public/images/source.jpg');
  const finalUrl = path.join(__dirname, '../../../public/images/watermark.jpg');
  util.addImgWater(sourceUrl, waterUrl,finalUrl, (err, data) => {
    if(err) {
      deferred.reject(err);
      return;
    }
    deferred.resolve(data);
  });
  return deferred.promise;
}

function test3() {
  const sourceUrl = path.join(__dirname, '../../../public/images/bg.png');
  const finalUrl = path.join(__dirname, '../../../public/images/test.png');
  util.addTextWater(sourceUrl, finalUrl, (err, result) => {
    if(err) {
      console.log(err);
    }
    console.log(result);
  });
}


