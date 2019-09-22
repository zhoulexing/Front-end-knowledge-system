"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _koa = _interopRequireDefault(require("koa"));

var _koaStatic = _interopRequireDefault(require("koa-static"));

var _path = _interopRequireDefault(require("path"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _reactRouterDom = require("react-router-dom");

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("../src/store"));

var _router = _interopRequireDefault(require("../src/router"));

var _config = _interopRequireDefault(require("./config"));

var app = new _koa["default"]();
app.use((0, _koaStatic["default"])(_path["default"].join(__dirname, "./static")));
app.use(function (ctx) {
  var context = {};
  var str = (0, _server.renderToString)(_react["default"].createElement(_reactRedux.Provider, {
    store: _store["default"]
  }, _react["default"].createElement(_reactRouterDom.StaticRouter, {
    location: ctx.url,
    context: context
  }, _react["default"].createElement(_router["default"], null))));
  ctx.body = str;
});
app.listen(_config["default"].port, function () {
  console.log("the server is start at port ".concat(_config["default"].port));
});