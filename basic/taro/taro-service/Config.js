import fs from "fs-extra";
import helper  from "../taro-helper/index";
import path from "path";
import { CONFIG_DIR_NAME, DEFAULT_CONFIG_FILE } from "./utils/constants";
import { merge } from "lodash";

export default class Config {
    constructor(opts) {
        this.appPath = opts.appPath;
        this.init();
    }

    init() {
        this.configPath = helper.resolveScriptPath(
            path.join(this.appPath, CONFIG_DIR_NAME, DEFAULT_CONFIG_FILE)
        );
        if (!fs.existsSync(this.configPath)) {
            this.initialConfig = {};
            this.isInitSuccess = false;
        } else {
            helper.createBabelRegister({
                only: [
                    (filePath) =>
                        filePath.indexOf(
                            path.join(this.appPath, CONFIG_DIR_NAME)
                        ) >= 0,
                ],
            });
            try {
                this.initialConfig = helper.getModuleDefaultExport(
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
