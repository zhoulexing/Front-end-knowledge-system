const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const DIR_NAME = "progressive.web.application";
module.exports = {
    entry: `./${DIR_NAME}/index.js`,
    output: {
        path: path.resolve(__dirname, DIR_NAME),
        filename: "dist/bundle.js"
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Manage Output"
        }),
        new WorkboxPlugin({
            clientsClaim: true,
            skipWaiting: true
        })
    ]
};
