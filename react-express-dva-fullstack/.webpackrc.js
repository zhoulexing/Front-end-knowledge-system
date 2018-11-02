const path = require("path");
export default {
    entry: "./src/index.js",
    outputPath: path.resolve(__dirname, "client"),
    theme: "./src/theme.js",
    alias: {
        "utils": path.resolve(__dirname, "./src/utils"),
        "common": path.resolve(__dirname, "./src/common"),
        "components": path.resolve(__dirname, "./src/components"),
        "images": path.resolve(__dirname, "./src/assets/images"),
        "layouts": path.resolve(__dirname, "./src/layouts"),
        "routes": path.resolve(__dirname, "./src/routes")
    },
    html: {
        template: "./src/index.ejs",
        title: "周某人",
        favicon: "./src/assets/images/favicon.ico"
    },
    extraBabelPlugins: [
        ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
    ],
    env: {
        development: {
            extraBabelPlugins: ["dva-hmr"]
        }
    },
    disableDynamicImport: false,
    lessLoaderOptions: {
        javascriptEnabled: true
    },
    browserslist: [
        "> 1%",
        "last 2 versions"
    ],
    ignoreMomentLocale: true,
    hash: true,
    /*copy: [
        { from: "", to: "" }
    ],*/
    proxy: {
        "/api/*": {
            target: "http://127.0.0.1:3000",
            changeOrigin: true
        }
    }
}
