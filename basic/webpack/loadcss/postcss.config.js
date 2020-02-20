module.exports = {
    plugins: [
        require("autoprefixer")({
            overrideBrowserslist: ["> 1%", "last 5 versions"]
        }),
        require("postcss-import"),
        // require("cssnano")
    ]
};
