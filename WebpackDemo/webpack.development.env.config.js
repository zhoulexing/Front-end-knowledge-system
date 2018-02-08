const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const DIR_NAME = "development.env";
module.exports = {
    entry: `./${DIR_NAME}/index.js`,
    output: {
        path: path.resolve(__dirname, DIR_NAME),
        filename: "js/bundle.js"
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            title: "Manage Output"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new UglifyJSPlugin()
    ],
    devServer: {
        contentBase: `./${DIR_NAME}`,
        hot: true
    }
};
