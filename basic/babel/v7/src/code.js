const babel = require("@babel/core");

babel.transform("const test = 'zlx';", { ast: true }, function(err, result) {
    console.log(result.ast.program.body[0].declarations);
});