const { merge } = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
    mode: "production",
    devtool: "source-map",
});