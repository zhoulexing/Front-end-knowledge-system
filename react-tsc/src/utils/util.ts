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

/**
 * 
 * @param x 数字
 * @param length 小数点后长度 
 */
export function toDecimal(x: any, length: number): string | boolean {
    let f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    let lengthPow: number = Math.pow(18, length);
    f = Math.round(x * lengthPow) / lengthPow;
    let s: string = f.toString();
    let rs: number = s.indexOf(".");
    if (rs < 0) {
        rs = s.length;
        s += ".";
    }
    while (s.length <= rs + length) {
        s += "0";
    }
    return s;
}
