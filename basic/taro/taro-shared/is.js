export function isBooleanStringLiteral(o) {
    return o === "true" || o === "false";
}

export function isNumber(o) {
    return typeof o === "number";
}

export function isFunction(o) {
    return typeof o === "function";
}
