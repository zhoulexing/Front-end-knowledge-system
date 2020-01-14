const path = require("path");
const fs = require("fs");
const util = require("util");
const send = require("koa-send");
const { uploadFile } = require("../../utils/upload");
const request = require("../../utils/request");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const verify = util.promisify(jwt.verify);
const { Demo } = require("../../utils/mongodb");
const crypto = require("crypto");

module.exports = {
    async index(ctx) {
        await ctx.render("hello");
    },

    /**
     * jsonp接口demo
     * @param {object} ctx 
     */
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

    /**
     * 获取上传图片的页面
     * @param {object} ctx 
     */
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

    /**
     * 上传文件
     * @param {object} ctx 
     */
    async uplpadDone(ctx) {
        // 上传文件请求处理
        let uploadFilePath = path.join( __dirname, "../../static/upload/" );
        let result = await uploadFile( ctx, {
            path: uploadFilePath
        });
        ctx.body = result;
    },

    /**
     * 获取图片
     * @param {object} ctx 
     */
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

    /**
     * 获取js
     * @param {object} ctx 
     */
    async getJs(ctx) {
        const { filename } = ctx.params;
        const filepath = path.join(__dirname, "../../static/javascripts/", filename);

        await asyncTime(2000);

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

    /**
     * 获取css
     * @param {object} ctx 
     */
    async getCss(ctx) {
        const { filename } = ctx.params;
        const filepath = path.join(__dirname, "../../static/styles/", filename);

        await asyncTime(3000);

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

    /**
     * 下载
     * @param {object} ctx 
     */
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

    /**
     * 测试request
     * @param {object} ctx 
     */
    async getData(ctx) {
        const data = await request.get("define?userid=admin", {"tacticsid":"1c2c7369d253f914cc12ebe202be9932"});
        ctx.body = data;
    },

    /**
     * 测试jwt
     * @param {object} ctx 
     */
    async getJwt(ctx) {
        // 获取jwt
        const token = ctx.header.authorization;
        if(token) {
            let payload = await verify(token.split(" ")[1], config.jwtSecret);
            ctx.body = payload;
        } else {
            ctx.body = "失败了";
        }
    },

    /**
     * 测试mongodb保存数据
     * @param {object} ctx 
     */
    async getList(ctx) {
        const query = ctx.query;
        const result = { success: false };
        await asyncTime(2000);
        if(query.ID) {
            const demo = new Demo({ ...query });    
            await demo.save();
            result.success = true;
            result.msg = "插入成功";
        } else {
            result.msg = "插入失败";
        }
        const list = await Demo.find();
        result.list = list;
        ctx.body = result;
    },

    async getImage(ctx) {
        const { query, response, request } = ctx;
        const filepath = path.join(__dirname, "../../static/images/", query.filename);

        // 判断图片是否存在
        let exist = fs.existsSync(filepath);
        let data = "未找到相关内容";
        
        // response.set("pragma", "no-cache");
        // response.set("expires", new Date(Date.now() + 10 * 1000).toString());
        // response.set("cache-control", "max-age=60");
        // if(exist) {
            // data = fs.readFileSync(filepath);
        // }

        // const ifModifiedSince = request.headers["if-modified-since"];
        // const imageStatus = fs.statSync(filepath);
        // const lastModified = imageStatus.mtime.toGMTString();
        // if (ifModifiedSince === lastModified) {
        //     response.status = 304;
        // } else if (exist) {
        //     response.lastModified = lastModified;
        //     data = fs.readFileSync(filepath);
        // }


        const ifNoneMatch = request.headers["if-none-match"];
        const hash = crypto.createHash("md5");
        const imageBuffer = fs.readFileSync(filepath);
        hash.update(imageBuffer);
        const etag = `"${hash.digest("hex")}"`;
        if (ifNoneMatch === etag) {
            response.status = 304;
        } else if(exist) {
            response.set("etag", etag);
            data = imageBuffer;
        }


        ctx.body = data;
    }
}

function asyncTime(delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delay);
    });
}
