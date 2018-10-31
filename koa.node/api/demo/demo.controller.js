const path = require("path");
const fs = require("fs");
const send = require("koa-send");
const { uploadFile } = require("../../utils/upload");
const { request, summary, query, body, tags } = require("koa-swagger-decorator");

module.exports = {
    async getJsonpData(ctx) {
        if (ctx.method === "GET") {
            // 获取jsonp的callback
            let callbackName = ctx.query.callback || "callback";
            let resultData = {
                success: true,
                data: {
                    name: "特朗普",
                    age: "250"
                }
            };
            let jsonpStr = `;${callbackName}(${JSON.stringify(resultData)})`;
            // 用text/javascript，让请求支持跨域获取
            ctx.type = "text/javascript";
            ctx.body = jsonpStr;
        } else {
            ctx.body = "只支持GET请求!";
        }
    },

    async getUploadPage(ctx) {
        let html = `
            <h1>koa2 upload demo</h1>
            <form method="POST" action="/api/demo/upload/done" enctype="multipart/form-data">
                <p>file upload</p>
                <span>picName:</span><input name="picName" type="text" /><br/>
                <input name="file" type="file" /><br/><br/>
                <button type="submit">submit</button>
            </form>
        `;
        ctx.body = html;
    },

    async uplpadDone(ctx) {
        // 上传文件请求处理
        let uploadFilePath = path.join( __dirname, "../../static/upload/" );
        let result = await uploadFile( ctx, {
            path: uploadFilePath
        });
        ctx.body = result;
    },

    async getPhone(ctx) {
        const { filename } = ctx.params;
        const filepath = path.join(__dirname, "../../static/images/", filename);

        // 判断图片是否存在
        let exist = fs.existsSync(filepath);
        let data = "未找到相关内容";
        if (exist) {
            data = fs.readFileSync(filepath);
            ctx.res.writeHead(200);
            ctx.res.write(data, "binary");
            ctx.res.end();
        }
        ctx.body = data;
    },

    async download(ctx) {
        const { filename } = ctx.params;
        const filepath = path.join(__dirname, "../../static/images");
        try {
            ctx.attachment(filename);
            await send(ctx, filename, { root: filepath });
        } catch (err) {
            console.error(err);
        }
    },

    @request("get", "/api/demo/swagger")
    @summary("test swagger")
    @query({
      type: { type: "number", required: true, default: 1, description: "type" }
    })
    async testSwagger(ctx) {
        ctx.body = "test swagger";
    }
}