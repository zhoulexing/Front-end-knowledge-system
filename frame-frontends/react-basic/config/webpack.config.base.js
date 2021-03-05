const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        filename: "[name].[hash:8].js",
        path: path.resolve(__dirname, "../dist"),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "test",
            template: `./src/index.ejs`,
            filename: `index.html`,
            // 压缩html
            minify: {
                minifyJS: true,
                minifyCSS: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true // 删除空白符与换行符
            }
        }),
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: "all",
            maxAsyncRequests: 5,
            minSize: 1000,
            maxSize: 60000,
            minChunks: 1,
            cacheGroups: {
                reactBase: {
                    name: "reactBase",
                    test: (module) => {
                        console.log("--->", /[\\/]node_modules[\\/](react|react-dom)$/.test(module.context));
                        return /[\\/]node_modules[\\/](react|react-dom)$/.test(module.context)
                    },
                    chunks: "initial",
                    priority: 100
                },
                printModal: {
                    name: "render",
                    test: /[\\/]src[\\/]render/,
                    chunks: "initial",
                    priority: 101
                }
            }
        },
    },
    // cache: {
    //     type: 'filesystem',
    //     buildDependencies: {
    //         config: [ __filename ] // 当你 CLI 自动添加它时，你可以忽略它
    //     }
    // }
}