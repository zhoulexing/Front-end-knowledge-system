const { merge } = require("webpack-merge");
const path = require("path");
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        host: "0.0.0.0",
        port: 8080
    }
});