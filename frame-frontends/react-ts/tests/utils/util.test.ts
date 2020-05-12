import { expect } from "chai";
import { isPromise, toDecimal, dayOfYear, decapitalize } from "@/utils/util";

describe("test object is promise", () => {
    it("should return true", () => {
        const promise = Promise.resolve(100);
        const bool = isPromise(promise);
        expect(bool).to.equal(true);
    });

    it("should return false", () => {
        const bool = isPromise({});
        expect(bool).to.equal(false);
    });

    it("给一个数添加小数点长度不够补0", () => {
        const str = toDecimal(9);
        const str2 = toDecimal("9");
        const str3 = toDecimal(9.043);
        const str4 = toDecimal(9.045);
        const str5 = toDecimal(9, 5);
        expect(str).to.equal("9.00");
        expect(str2).to.equal("9.00");
        expect(str3).to.equal("9.04");
        expect(str4).to.equal("9.05");
        expect(str5).to.equal("9.00000");
    });

    it("计算某时间是当年中的第几天", () => {
        const date = new Date("2020-01-20");
        const value = dayOfYear(date);
        expect(value).to.equal(20);
    });

    it("将字符串的首字母转换成小写字母", () => {
        const str = decapitalize("1b45a");
        const str2 = decapitalize("Abc");
        expect(str).to.equal("1b45a");
        expect(str2).to.equal("abc");
    });
});