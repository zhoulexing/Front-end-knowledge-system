import { parse } from "querystring";
import { RouterConfigProps } from "../common/router";

export const getRoutes = (path: string, routerConfig: RouterConfigProps) => {
    let routes = Object.keys(routerConfig)
        .filter((key) => {
            return key.startsWith(path) && path !== key;
        })
        .filter((key) => {
            return key.replace(path, "").split("/").length === 2;
        });

    return routes.map((key) => {
        return {
            key,
            path: key,
            ...routerConfig[key],
        };
    });
};

export const getUrlParam = (name: string) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

export const isSuperLink = (url: string) => {
    return /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/.test(url);
};

/**
 * 将url转化成一个数组
 * @param { string } url
 * eg: /a/b/c => [/a, /a/b, /a/b/c]
 */
export function urlToList(url: string) {
    const urllist = url.split("/").filter((i) => i);
    return urllist.map((urlItem, index) => {
        return `/${urllist.slice(0, index + 1).join("/")}`;
    });
}

export const getPageQuery = () => parse(window.location.href.split("?")[1]);


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
export function toDecimal(x: any, length: number = 2): string | boolean {
    let f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    const lengthPow: number = Math.pow(10, length);
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
 * @param {string} param
 * @returns {string}
 */
export function decapitalize([first, ...rest]: string[]): string {
    return first.toLowerCase() + rest.join("");
}
