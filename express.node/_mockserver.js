const fs = require("fs");
const mockSuffix = /mock\.js$/;
const _ = require("lodash");
const path = require("path");
const mockConfig = "./_mockconfig.js";

// 读取指定目录下的js文件
const mocks = read("./app/mock");
//将所有servers的 *mock.js 文件重写到mockConfig
write(mocks, path.resolve("./", mockConfig), process.env.PRODUCTION || false);
watchAll(mocks, mockConfig);

function read(dirOrFile, buf) {
    buf = buf || {};
    const stats = fs.statSync(dirOrFile);
    if(stats.isFile()) {
        if(mockSuffix.test(dirOrFile)) {
            buf[dirOrFile] = require(dirOrFile);
        }
    } else if(stats.isDirectory()) {
        const filenames = fs.readdirSync(dirOrFile);
        filenames.forEach(file => {
            read(path.resolve(dirOrFile, file), buf);
        });
    }
    return buf;
}

function write(obj, xpath, isProc) {
    const out = merge(obj);
    if(!isProc) {
        Object.keys(out).forEach(key => { out[key].proxy && delete out[key].proxy });
    } else {
        Object.keys(out).forEach(key => { out[key].disabled && delete out[key].proxy && delete out[key].disabled });
    }
    fs.writeFileSync(xpath, new Buffer("module.exports = " + JSON.stringify({ api: out })), { encoding: "utf-8" });
}

function merge(obj) {
    let api = {};
    Object.keys(obj).forEach(i => {
      api = _.merge(api, obj[i]);
    });
    return api;
}

function watchAll(cfgs, mockConfigUrl) {
  Object.keys(cfgs).forEach(i => {
    watch(i, mockConfigUrl);
  });
}

function watch(mockConfigFile, mockCofigUrl) {
    fs.watch(mockConfigFile, (eventType, filename) => {
        if (filename) {
            const mocks = read("./app/mock");
            write(mocks, path.resolve("./", mockConfig), process.env.PRODUCTION || false);
            fs.utimes(mockCofigUrl, new Date(), new Date()); //触发pure在线刷新
        }
    });
    const mockConfigFileWatcher = watchFile(mockConfigFile, function (filename) {
        unwatchFile(mockConfigFileWatcher, filename);
        fs.utimes(mockCofigUrl, new Date(), new Date());
    });
}

function watchFile(filename, callback) {
  var isWin = (process.platform === 'win32');
  if (isWin) {
    return fs.watch(filename, function(event) {
      if (event === 'change') {
        return callback(filename);
      }
    });
  } else {
    return fs.watchFile(filename, {
      interval: 200
    }, function(curr, prev) {
      if (curr.mtime > prev.mtime) {
        return callback(filename);
      }
    });
  }
}

/**
 * 根据情况 unwatchFile
 */
function unwatchFile(watcher, filename) {
  if (watcher) {
    watcher.close && watcher.close();
  } else {
    fs.unwatchFile(filename);
  }
}

module.exports = require("puer-mock")(__filename, mockConfig);
