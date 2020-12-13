import createDebug from "debug";
import * as constants from "./constants";
import createBabelRegister from './babelRegister';
import * as utils from "./utils";
import * as npm from "./npm";


const helper = {
    ...constants,
    ...utils,
    ...npm,
    createDebug,
    createBabelRegister,
};

export default helper;
