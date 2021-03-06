const nodeExternals = require("webpack-node-externals");
const path = require("path");

process.env.BABEL_ENV = "node";

module.exports = {
    mode: "development",
    target: "node",
    entry: "./server/v4/index.js",
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "../../dist/v4/server"),
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ],
    },
};
