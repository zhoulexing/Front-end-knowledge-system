const assert = require("assert");
const should = require("should");
const qs = require("querystring");

describe("Array", function() {
    it("inclides should return true", function() {
        assert.equal(true, [1, 2, 3].includes(3));
        should.equal(true, [1, 2, 3].includes(2));
    });

    it("find should return object", function() {
        let obj = [{ name: "zlx" }].find(item => item.name === "zlx");
        should(obj).have.property("name");
    });

    it("querystring should return string", function() {
        let str = { a: 1, b: 2, c: { c: 3 } };
        let qsStr = qs.stringify(str);
        console.log(qsStr);
        should(qsStr).equal("a=1&b=2&c=");
    })
});