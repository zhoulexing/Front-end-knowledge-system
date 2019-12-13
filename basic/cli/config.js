module.exports = {
    react: {
        type: "react",
        options: [{ 
            type: "input", 
            name: "name", 
            message: "请输入项目名称: "
        }, { 
            type: "input", 
            name: "version", 
            message: "请输入对应的版本(如：v16.0.0): "
        }, { 
            type: "confirm", 
            name: "redux", 
            message: "是否使用redux?",
            default: true
        }, { 
            type: "list", 
            name: "css", 
            message: "请选择css预编译语言: ",
            choices: ["less", "scss"],
            default: 0
        }]
    }
};