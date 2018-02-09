const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const DIR_NAME = "production.env";
module.exports = {
    entry: `./${DIR_NAME}/index.js`,
    output: {
        path: path.resolve(__dirname, DIR_NAME),
        filename: "dist/[name].js",
        chunkFilename: "dist/[name].js"
    },
    devtool: "inline-source-map",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Manage Output"
        }),
        //new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        })
    ]
};
