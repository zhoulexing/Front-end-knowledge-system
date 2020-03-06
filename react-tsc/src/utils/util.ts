/**
 * 判断是否为promise对象
 * 
 * @param {any} obj
 * @returns {boolean} 
 * 
 * @author zlx
 */
export function isPromise(obj?: any): boolean {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
}

/**
 * 给一个数添加小数点长度不够补0
 * 
 * @param {any} x 数字
 * @param {number} length 小数点后长度 
 * 
 * @returns {string|boolean}
 * @author zlx
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

/**
 * 计算某时间是当年中的第几天
 * 
 * @param {Date} date 时间
 * @returns {number}
 * 
 * @author zlx
 */
export function dayOfYear(date: Date): number {
	const current: number = new Date(date.getFullYear(), 0, 0).valueOf();
	return Math.floor((date.valueOf() - current) / 1000 / 60 / 60 / 24);
}

/**
 * 将字符串的首字母转换成小写字母
 * 
 * @param {string} param0
 * @returns {string}
 */
export function decapitalize([first, ...rest]: Array<string>): string {
	return first.toLowerCase() + rest.join('');
}
