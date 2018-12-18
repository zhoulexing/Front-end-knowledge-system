const gulp = require("gulp");
const spritesmith = require("gulp.spritesmith");

gulp.task("sprite", () => {
    return gulp.src("./images/*.png")
        .pipe(spritesmith({
            imgName: "icon.png", // 参数，生成图片文件名
            cssName: "icon.less", // 参数，生成的样式文件名
            padding: 2, // 每个图片之间的间距
            cssTemplate: data => {
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
        .pipe(gulp.dest("dist"));
});