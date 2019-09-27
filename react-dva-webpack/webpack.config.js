const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleConcatenationPlugin = require("webpack/lib/optimize/ModuleConcatenationPlugin");
const HappyPack = require("happypack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const os = require("os");
const chalk = require("chalk");
const path = require("path");
const package = require("./package.json");

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const version = package.version;
const IS_PRO = process.env._ENV_ === "production";

let plugins = [
    new HtmlWebpackPlugin({
        title: "周某人",
        template: `./client/index.ejs`,
        filename: `index${IS_PRO ? `-v${version}` : ""}.html`,
        // 压缩html
        minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true
        }
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
    }),
    new HappyPack({
        id: "js",
        loaders: ["babel-loader?cacheDirectory=true"],
        threadPool: happyThreadPool,
        verbose: true
    }),
];

if (IS_PRO) {
    plugins = plugins.concat([
        new CleanWebpackPlugin(),
        // 压缩css
        new OptimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require("cssnano"),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)"
        }),
    ]);
} else {
    plugins = plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        // 开启作用域提升( Scope Hoisting ), 生产情况下是默认配置的
        new ModuleConcatenationPlugin(),
    ]);
}


module.exports = {
    entry: "./client/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
    },
    plugins: plugins,
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css"],
        modules: ["node_modules"],
        alias: require("./client/alias")
    },
    devtool: IS_PRO ? "" : "inline-source-map",
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ["happypack/loader?id=js"]
        }, {
            test: /\.(less|css)$/,
            exclude: /node_modules/,
            use: [
                { 
                    loader: MiniCssExtractPlugin.loader, 
                    options: {
                        hmr: !IS_PRO,
                    },
                },
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        url: true,
                    }
                },
                "postcss-loader",
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: require("./client/theme"),
                        javascriptEnabled: true,
                    }
                }
            ]
        }, {
            test: /\.(less|css)$/,
            include: /node_modules/,
            use: [
                { 
                    loader: MiniCssExtractPlugin.loader, 
                },
                "css-loader",
                "postcss-loader",
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: require("./client/theme"),
                        javascriptEnabled: true,
                    }
                }
            ]
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
            use: ["file-loader?name=iconfont/[name]_[sha512:hash:base64:7].[ext]"],
            include: path.resolve(__dirname, "client"),
        }, {
            test: /\.(png|jpg|gif)$/,
            use: ["url-loader?limit=8192&name=images/[name]_[sha512:hash:base64:7].[ext]"],
            include: path.resolve(__dirname, "client"),
        }]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            }),
        ],
        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 30000,
                    name: IS_PRO ? 'commons.[contenthash].js' : 'commons.[hash].js',
                },
                vendors: {
                    test: /node_modules/,
                    chunks: 'all',
                    name: IS_PRO ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
                    // 优先级
                    priority: -10
                }
            }
        },
        // 将webpack运行时生成代码打包到runtime.js
        runtimeChunk: true
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        compress: true,
        hot: true,
        host: "127.0.0.1",
        port: 8889,
    }
};
