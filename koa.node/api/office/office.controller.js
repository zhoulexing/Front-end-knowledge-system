const officegen = require("officegen");
const fs = require("fs");
const path = require("path");

const docx = officegen("docx");

module.exports.docx = async ctx => {
    const header = docx.getHeader().createP({ align:("center") });
    header.addText("公司名称", { font_size: 12, font_face: "SimSun" });
    header.addHorizontalLine();

    const out = fs.createWriteStream(path.join(__dirname, "./out.docx"));
    out.on ( "error", function ( err ) {
        console.log ( err );
    });
    const result = docx.generate(out);// 服务端生成word
    ctx.body = "true";
}