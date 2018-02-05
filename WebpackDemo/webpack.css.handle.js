const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./css.handle/index.js",
    output: {
        path: path.resolve(__dirname, "css.handle"),
        filename: "bundle.js"
    },
    module: {
        rules: [
           /*  {
                test: /\.css$/,
                use: ["style-loader","css-loader"]
            }, */
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: "[local]_[hash:base64:5]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                config: {
                                    path: ".postcssrc.js"
                                }
                            }
                        }
                    ]
                })
            }   
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
    ]
};