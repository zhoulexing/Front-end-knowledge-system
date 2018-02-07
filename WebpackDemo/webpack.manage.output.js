const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');


const name = "manage.output";
module.exports = {
    entry: "./" + name + "/index.js",
    output: {
        path: path.resolve(__dirname, name),
        filename: "bundle.js"
    },
    plugins: [ 
        //new CleanWebpackPlugin(['./' + name + '/dist']),
        new HtmlWebpackPlugin({
            title: "Manage Output"
        }),
    ]
};