webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
Promise.resolve().then((require => {
   const b = __webpack_require__(1);
   console.log(b);
}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);

/* harmony default export */ __webpack_exports__["default"] = "A";

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
const c = __webpack_require__(2);
console.log("c:", c);
/* harmony default export */ __webpack_exports__["default"] = "b";

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "c";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./a.js": 0,
	"./b.js": 1,
	"./c.js": 2
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 3;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const a = __webpack_require__(0);
const context = __webpack_require__(3);
console.log("context:", context.keys());
console.log("context:", context("./a.js"));
console.log("a:", a);
module.exports = "Hello";

/***/ })
],[4]);