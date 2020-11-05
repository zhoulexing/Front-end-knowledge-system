const { override, fixBabelImports } = require("customize-cra");

module.exports = override(fixBabelImports("import", {
    libraryName: 'ant-mobile',
    style: 'css'
}));
