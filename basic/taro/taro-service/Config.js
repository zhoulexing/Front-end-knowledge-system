import * as fs from "fs-extra";
import {
    resolveScriptPath,
    createBabelRegister,
    getModuleDefaultExport,
} from "../taro-helper/index";
import * as path from "path";
import { CONFIG_DIR_NAME, DEFAULT_CONFIG_FILE } from "./constants";
import { merge } from "lodash";

export default class Config {
    constructor(opts) {
        this.appPath = opts.appPath;
        this.init();
    }

    init() {
        this.configPath = resolveScriptPath(
            path.join(this.appPath, CONFIG_DIR_NAME, DEFAULT_CONFIG_FILE)
        );
        if (!fs.existsSync(this.configPath)) {
            this.initialConfig = {};
            this.isInitSuccess = false;
        } else {
            createBabelRegister({
                only: [
                    (filePath) =>
                        filePath.indexOf(
                            path.join(this.appPath, CONFIG_DIR_NAME)
                        ) >= 0,
                ],
            });
            try {
                this.initialConfig = getModuleDefaultExport(
                    require(this.configPath)
                )(merge);
                this.isInitSuccess = true;
            } catch (err) {
                this.initialConfig = {};
                this.isInitSuccess = false;
                console.log(err);
            }
        }
    }
}
