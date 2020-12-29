import createDebug from "debug";
import * as constants from "./constants";
import createBabelRegister from './babelRegister';
import * as utils from "./utils";
import * as npm from "./npm";
import chalk from 'chalk';
import fs from "fs-extra";


const helper = {
    ...constants,
    ...utils,
    ...npm,
    createDebug,
    chalk,
    fs,
    createBabelRegister,
};

export default helper;