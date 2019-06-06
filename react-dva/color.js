const path = require("path");
const { generateTheme } = require("antd-theme-generator");


const options = {
    antDir: path.join(__dirname, "./node_modules/antd"), //对应具体位置
    stylesDir: path.join(__dirname, "./src/styles"),
    mainLessFile: path.join(__dirname, "./src/index.less"),
    // varFile: path.join(__dirname, "./src/var.less"), //对应具体位置
    // indexFileName: "index.html",
    themeVariables: [
        "@primary-color",
        "@success-color"
    ],
    outputFilePath: path.join(__dirname, "./src/assets/color.less"),
};

generateTheme(options).then(less => {
    console.log("Theme generated successfully");
})
.catch(error => {
    console.log("Error", error);
});