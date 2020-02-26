// const { defaults: tsjPreset } = require("ts-jest/presets");
// const { jsWithTs: tsjPreset } = require("ts-jest/presets");
const { jsWithBabel: tsjPreset } = require("ts-jest/presets");
const path = require("path");

module.exports = {
    rootDir: path.resolve(__dirname),
    collectCoverage: false, // 是否收集测试时的覆盖率
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"], // 哪些文件需要收集覆盖率信息
    coverageDirectory: "<rootDir>/tests/coverage", // 输出覆盖信息文件的目录
    coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/src/index.tsx"], // 统计覆盖信息时需要忽略的文件
    moduleNameMapper: {
        // 代表需要被 Mock 的资源名称
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|sass|scss)$": "<rootDir>/tests/cssTransform.js",
    },
    setupFiles: ["<rootDir>/tests/setup.js"], // 运行测试前可运行的脚本，比如注册enzyme的兼容
    testMatch: [
        // 匹配的测试文件
        "<rootDir>/tests/**/*.(spec|test).[jt]s?(x)",
        // "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    preset: "ts-jest",
    transform: {
        ...tsjPreset.transform,
        "^.+\\.(css|less)$": "<rootDir>/tests/cssTransform.js",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/tests/fileTransform.js"
    },
    transformIgnorePatterns: [
        // 转换时需要忽略的文件
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|mjs)$"
    ]
};
