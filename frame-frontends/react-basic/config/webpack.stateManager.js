const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonPath = path.resolve(__dirname, "../client/common");

module.exports = {
    entry: './entry/stateManager.tsx',

    context: commonPath,

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: ["node_modules"]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "react-basic",
            template: `./templates/index.ejs`,
            filename: `index.html`
        }),
    ],

    devServer: {
        contentBase: path.resolve(__dirname, "./clent"),
        compress: true,
        hot: true,
        historyApiFallback: true,
        host: "0.0.0.0",
        port: 8000
    }
}