const gulp = require("gulp");
const spritesmith = require("gulp.spritesmith");
const iconfont = require("gulp-iconfont");
const iconfontCss = require("gulp-iconfont-css");

gulp.task("sprite", () => {
    return gulp.src("./images/png/*.png")
        .pipe(spritesmith({
            imgName: "icon.png", // 参数，生成图片文件名
            cssName: "icon.css", // 参数，生成的样式文件名
            padding: 2, // 每个图片之间的间距
            cssTemplate: data => { // css模板
                let arr = [];
                let url = data.spritesheet.image;
                arr.push(
                    `.icon {
                        display: inline-block;
                        vertical-align: middle;
                        background: url("${url}") no-repeat;
                    }`
                );
                data.sprites.forEach(sprite => {
                    arr.push(
                        `.icon-${sprite.name} {
                            width: ${sprite.px.width};
                            height: ${sprite.px.height};
                            background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
                            background-size: ${sprite.px.width} ${sprite.px.height};
                        }`
                    );
                });
                return arr.join('');
            }
        }))
        .pipe(gulp.dest("dist/sprite"));
});

gulp.task("iconfont", () => {
    return gulp.src("./images/svg/*.svg")
        .pipe(iconfontCss({
            fontName: "iconfont",
            path: "./templates/iconfont.css", // 模板信息的路劲
            targetPath: "iconfont.css", // 生成的less|css样式的路劲
            fontPath: "./", // 生成的font的路径
        }))
        .pipe(iconfont({
            fontName: "iconfont",
            prependUnicode: true,
            formats: ["ttf", "eot", "woff", "svg"],
            timestamp: new Date().getTime()
        }))
        .pipe(gulp.dest("dist/iconfont"));
});