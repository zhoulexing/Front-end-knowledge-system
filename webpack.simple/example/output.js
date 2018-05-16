/******/(function(modules) {
/******/	var installedModules = {};
/******/	function require(moduleId) {
/******/		if(installedModules[moduleId])
/******/			return installedModules[moduleId].exports;
/******/		var module = installedModules[moduleId] = {
/******/			exports: {}
/******/		};
/******/		modules[moduleId](module, module.exports, require);
/******/		return module.exports;
/******/	}
/******/	return require(0);
/******/})
/******/({
/******/0: function(module, exports, require) {

const a = require(/* ./a.js */1);
const b = require(/* ./b.js */2);

console.log(a + b);

/******/},
/******/
/******/1: function(module, exports, require) {

module.exports = "a";

/******/},
/******/
/******/2: function(module, exports, require) {

module.exports = "b";

/******/},
/******/
/******/})