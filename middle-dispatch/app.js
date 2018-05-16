
const express = require('express')();
const config = require('./config/index');


const app = require('./config/express')(express, config);

// 创建一个服务
app.listen(config.port, config.ip, () => {
  console.log(`Express server listening on ${ config.ip }:${ config.port }`);
});

module.exports = app;