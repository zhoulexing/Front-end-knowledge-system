import createDebug from "debug";
import { SCRIPT_EXT, PLATFORMS } from "./constants";
import fs from "fs-extra";
import path from "path";
import findWorkspaceRoot from "find-yarn-workspace-root";

export const helper = {
    createDebug,
};

export function resolveScriptPath(p) {
    return resolveMainFilePath(p);
}

export function resolveMainFilePath(p, extArrs = SCRIPT_EXT) {
    const realPath = p;
    const taroEnv = process.env.TARO_ENV;
    for (let i = 0; i < extArrs.length; i++) {
        const item = extArrs[i];
        if (taroEnv) {
            if (fs.existsSync(`${p}.${taroEnv}${item}`)) {
                return `${p}.${taroEnv}${item}`;
            }
            if (fs.existsSync(`${p}${path.sep}index.${taroEnv}${item}`)) {
                return `${p}${path.sep}index.${taroEnv}${item}`;
            }
            if (
                fs.existsSync(
                    `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`
                )
            ) {
                return `${p.replace(/\/index$/, `.${taroEnv}/index`)}${item}`;
            }
        }
        if (fs.existsSync(`${p}${item}`)) {
            return `${p}${item}`;
        }
        if (fs.existsSync(`${p}${path.sep}index${item}`)) {
            return `${p}${path.sep}index${item}`;
        }
    }
    return realPath;
}

export function createBabelRegister({ only }) {
    require("@babel/register")({
        // only: Array.from(new Set([...only])),
        presets: [
            require.resolve("@babel/preset-env"),
            require.resolve("@babel/preset-typescript"),
        ],
        plugins: [
            [
                require.resolve("@babel/plugin-proposal-decorators"),
                {
                    legacy: true,
                },
            ],
            require.resolve("@babel/plugin-proposal-class-properties"),
            require.resolve("@babel/plugin-proposal-object-rest-spread"),
            [
                require.resolve("@babel/plugin-transform-runtime"),
                {
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                    absoluteRuntime: path.resolve(
                        __dirname,
                        "..",
                        "node_modules/@babel/runtime"
                    ),
                },
            ],
        ],
        extensions: [".jsx", ".js", ".ts", ".tsx"],
        babelrc: false,
        configFile: false,
        cache: false,
    });
}

export const getModuleDefaultExport = (exports) =>
    exports.__esModule ? exports.default : exports;

export function normalizePath(path) {
    return path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
}

export function printLog(type, tag, filePath) {
    console.log("printLog: ", type, tag, filePath);
}

export const processTypeEnum = {
    START: "start",
    CREATE: "create",
    COMPILE: "compile",
    CONVERT: "convert",
    COPY: "copy",
    GENERATE: "generate",
    MODIFY: "modify",
    ERROR: "error",
    WARNING: "warning",
    UNLINK: "unlink",
    REFERENCE: "reference",
    REMIND: "remind",
};

export function recursiveFindNodeModules(filePath, lastFindPath) {
    if (
        lastFindPath &&
        normalizePath(filePath) === normalizePath(lastFindPath)
    ) {
        return filePath;
    }
    const dirname = path.dirname(filePath);
    const workspaceRoot = findWorkspaceRoot(dirname);
    const nodeModules = path.join(workspaceRoot || dirname, "node_modules");
    if (fs.existsSync(nodeModules)) {
        return nodeModules;
    }
    if (dirname.split(path.sep).length <= 1) {
        printLog(
            processTypeEnum.ERROR,
            `在${dirname}目录下`,
            "未找到node_modules文件夹，请先安装相关依赖库！"
        );
        return nodeModules;
    }
    return recursiveFindNodeModules(dirname, filePath);
}

export function addPlatforms(platform) {
    const upperPlatform = platform.toLocaleUpperCase();
    if (PLATFORMS[upperPlatform]) return;
    PLATFORMS[upperPlatform] = platform;
}

export default helper;
