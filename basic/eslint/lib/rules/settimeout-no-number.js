/**
 * @fileoverview setTimeout第二个参数是数字
 * @author eslint-zlx
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "setTimeout第二个参数是数字",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },
    // rule核心
    create: function(context) {
        debugger
        // 公共变量和函数应该在此定义
        return {
            "CallExpression": (node) => {
                debugger
                if(node.callee.name != "setTimeout") return;
                const timeNode = node.arguments && node.arguments[1] // 获取第二个参数
                if(!timeNode) return;
                if(timeNode.type === "Literal" && typeof timeNode.value === "number") {
                    context.report({
                        node,
                        message: "setTimeout第二个参数禁止是数字"
                    });
                }
            }
        };
    }
};
