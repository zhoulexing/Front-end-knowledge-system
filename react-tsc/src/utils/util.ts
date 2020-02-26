/**
 * 判断是否为promise对象
 * @param {object} obj
 */
export function isPromise(obj?: any) {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
}
