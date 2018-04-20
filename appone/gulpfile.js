"use strict";
// import NW = require("nw.js");
var NwBuilder = require("nw-builder");
var gulp = require("gulp");
var gutil = require("gulp-util");



const iconPath = process.cwd() + '/icon.ico';

gulp.task('build', function () {
    var nw = new NwBuilder({
        //appName : 'shark',
        version: '0.14.7',
        files: './app/**',
        winIco : iconPath,
        //platforms: ['osx64', 'win32', 'win64'],
        platforms: ['win32'],
        cacheDir: './cache',
        buildDir: './build' //生成编译后的可执行文件目录
    });
    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('nw-builder', msg);
    });
    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().then(function () {
        gutil.log("nw-builder", "DONE!!!");
    })["catch"](function (err) {
        gutil.log('nw-builder', err);
    });
});
gulp.task('default', ['build']);
