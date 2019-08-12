const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const { inspect } = require("util");

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @return {boolean} 创建目录结果
 */
function mkdirsSync(dirname) {
    if(fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync( path.dirname(dirname)) ) {
            fs.mkdirSync( dirname )
            return true;
        }
    }
}   

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName(fileName) {
    let nameList = fileName.split(".");
    return nameList.pop();
}

/**
 * 上传文件
 * @param {object} ctx koa上下文
 * @param {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
function uploadFile(ctx, options) {
    const { req, res } = ctx;
    const busboy = new Busboy({ headers: req.headers });

    // 获取文件路劲
    const fileType = options.fileType || "common";
    const filePath = path.resolve(options.path, fileType);
    const mkdirResult = mkdirsSync(filePath);

    return new Promise((resolve, reject) => {
        console.log("文件上传中...")
        let result = { 
            success: false,
            message: "",
            formData: {},
        }
    
        // 解析请求文件事件
        busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
            let fileName = Math.random().toString(16).substr(2) + "." + getSuffixName(filename);
            let saveTo = path.join(filePath, fileName);
        
            // 文件保存到制定路径
            file.pipe(fs.createWriteStream(saveTo));
        
            // 文件写入事件结束
            file.on("end", function() {
                result.success = true;
                result.message = "文件上传成功";
                console.log("文件上传成功！");
            })
        })
    
        // 解析表单中其他字段信息
        busboy.on("field", function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log("表单字段数据 [" + fieldname + "]: value: " + inspect(val));
            result.formData[fieldname] = inspect(val);
        });
    
        // 解析结束事件
        busboy.on("finish", function( ) {
          console.log("文件上传结束");
          resolve(result)
        })
    
        // 解析错误事件
        busboy.on("error", function(err) {
          console.log("文件上出错");
          reject(result);
        })
    
        req.pipe(busboy);
    });
}

module.exports = {
    uploadFile
};