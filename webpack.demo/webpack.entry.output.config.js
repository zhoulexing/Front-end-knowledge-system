const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const DIR_NAME = "entry.output";
module.exports = {
    entry: `./${DIR_NAME}/a.js`,
    output: {
        path: path.resolve(__dirname, DIR_NAME),
        filename: "c.js"
        //filename: "[name].[chunkhash].js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Manage Output"
        }),
    ]
};
