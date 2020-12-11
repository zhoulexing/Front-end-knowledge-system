import { isWindows } from "../../taro-helper/constants";
import path from "path";

export function printDevelopmentTip(platform) {
    if (
        process.env.NODE_ENV !== "production" &&
        process.env.NODE_ENV !== "test"
    ) {
        let exampleCommand;
        if (isWindows) {
            exampleCommand = `$ set NODE_ENV=production && taro build --type ${platform} --watch`;
        } else {
            exampleCommand = `$ NODE_ENV=production taro build --type ${platform} --watch`;
        }
        console.log(`Tips: 预览模式生成的文件较大，设置 NODE_ENV 为 production 可以开启压缩。
            Example:
            ${exampleCommand}
        `);
    }
}

export function getRootPath() {
    return path.resolve(__dirname, "../../");
}

export function getPkgVersion() {
    return 'v1.0.0';
}
