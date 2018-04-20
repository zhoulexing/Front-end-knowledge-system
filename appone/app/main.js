
"use strict";




const app = nw.App;

const helper = require('./asserts/helper');
const cfg = require('./config');
const pm = helper.parseParam(app.argv);

const iconPath = "asserts/icon.png";
// 创建窗口并获取它的窗口对象
nw.Window.open(cfg.url + '?' + pm, {
  "icon": "asserts/icon.png",
  "width": 1280,
  "height": 768
}, function (win) {

  //win.showDevTools();

  win.on('close', function () {
    this.removeAllListeners();
    this.hide(); // Pretend to be closed already
    console.log("We're closing...");
    this.close(true); // then close it forcely
  });

  win.on('closed', function () {
    win.close(true);
    app.closeAllWindows();
    win = null;
  });

});


