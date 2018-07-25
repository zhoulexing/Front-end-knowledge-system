const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const InlineManifestPlugin = require("inline-manifest-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    /*entry: {
        main: "./entry.js",
        //vendor: ["lodash", "moment"]
    },*/
    entry: "./entry.js",
    //devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, "dist"),
        // filename: "[name].[chunkhash:5].js",
        // chunkFilename: "[name].[chunkhash:5].js",
        filename: "[name].js",
        chunkFilename: "[name].js"
        //publicPath: "/dist/"
        //devtoolLineToLine: true
    },
    devServer: {
        hot: true, // 开启热替换
        contentBase: path.join(__dirname, "dist"),
        compress: false,
        port: 9000
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor"
            //names: ["vendor", "manifest"],
            /*minChunks: function(module) {
                // 该配置假定你引入的 vendor 存在于 node_modules 目录中
                return module.context && module.context.indexOf('node_modules') !== -1;
            }*/
        }),
        new HtmlWebpackPlugin({
            title: 'webpack',
            template: './index.ejs',
            inject: 'body'
        }),
        /*new InlineManifestPlugin({
            name: "vendor"
        })*/
        //new ManifestPlugin(),
        //new AssetsPlugin()
    ]
};