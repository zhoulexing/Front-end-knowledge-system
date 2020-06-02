/**
 * @fileoverview setTimeout第二个参数是数字
 * @author eslint-zlx
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/settimeout-no-number"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 7, // 默认支持语法为es5
    }
});
ruleTester.run("settimeout-no-number", rule, {
    // 正确的测试用例
    valid: [
        {
            code: 'let someNumber = 1000; setTimeout(()=>{ console.log(11) },someNumber)'
        },
        {
            code: 'setTimeout(()=>{ console.log(11) },someNumber)'
        }
    ],

    // 错误的测试用例
    invalid: [
        {
            code: "setTimeout(()=>{ console.log(11) },1000)",
            errors: [{
                message: "setTimeout第二个参数禁止是数字",
                type: "CallExpression"
            }]
        }
    ]
});
