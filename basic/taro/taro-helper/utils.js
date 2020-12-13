import path from "path";
import findWorkspaceRoot from "find-yarn-workspace-root";
import fs from "fs-extra";
import {
    processTypeEnum
} from "./constants";

export const getModuleDefaultExport = (exports) =>
    exports.__esModule ? exports.default : exports;

export function normalizePath(path) {
    return path.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
}

export function printLog(type, tag, filePath) {
    console.log("printLog: ", type, tag, filePath);
}

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