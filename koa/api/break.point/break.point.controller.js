const path = require("path");
const fs = require("fs");
const { getMimeNameFromExt } = require("../../utils/index");

module.exports = {
    async getPage(ctx) {
        await ctx.render("breakPoint");
    },
    
    async upload(ctx) {
        const body = ctx.request.body;
        const data = ctx.request.files.data; // 获取上传文件的数据
        const reader = fs.createReadStream(data.path);
        const filename = path.join(__dirname, "../../static/upload/break.point/", body.name);
        const upStream = fs.createWriteStream(filename);
        reader.pipe(upStream);
        ctx.body = { success: true };
    },

    async range(ctx) {
        const filepath = path.join(__dirname, "../../static/upload/break.point", "test.txt");
        let stat;
        try {
            stat = fs.statSync(filepath);
        } catch (error) {
            ctx.res.end();
        }
        const { Start, End } = readRangeHeader(ctx.request.headers["range"], stat.size);
        const responseHeaders = {};
        responseHeaders["Content-Range"] = `bytes ${ Start }-${ End }/${ stat.size }`;
        responseHeaders["Content-Length"] = Start == End ? 0 : (End - Start + 1);
        responseHeaders["Content-Type"] = getMimeNameFromExt(path.extname(filepath));
        responseHeaders["Accept-Range"] = "bytes";
        responseHeaders["Cache-control"] = "no-cache";
        ctx.attachment(decodeURI(filepath));

        ctx.res.writeHead(206, responseHeaders);
        const stream = fs.createReadStream(filepath, { start: Start, end: End, encoding: "utf8" });  
        stream.pipe(ctx.res);
    }   
};


function readRangeHeader(range, totalLength) {
    const result = {};
    if(range == null || range.length == 0) {
        result.Start = 0;
        result.End = totalLength - 1;
    } else {
        const array = range.match(/bytes=(\d*)-(\d*)/);
        const start = parseInt(array[1]);
        const end = parseInt(array[2]);
        result.Start = isNaN(start) ? 0 : start;
        result.End = isNaN(end) ? (totalLength - 1) : end;
    }
    return result;
}
