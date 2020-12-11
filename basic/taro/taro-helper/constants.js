import os from 'os'

export const JS_EXT = [".js", ".jsx"];
export const TS_EXT = [".ts", ".tsx"];
export const SCRIPT_EXT = JS_EXT.concat(TS_EXT);

export const NODE_MODULES = "node_modules";

export const PLATFORMS = (global["PLATFORMS"] = global["PLATFORMS"] || {});

export const isWindows = os.platform() === "win32";
