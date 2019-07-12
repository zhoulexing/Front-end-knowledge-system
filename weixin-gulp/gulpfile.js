const gulp = require("gulp");
const jsonminify = require("gulp-jsonminify");
const through = require("through2");
const combiner = require("stream-combiner2");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const pxtorpx = require("postcss-px2rpx");
const base64 = require("postcss-font-base64");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const log = require("fancy-log");
const colors = require("ansi-colors");
const filter = require("gulp-filter");
const cssnano = require("gulp-cssnano");
const jdists = require("gulp-jdists");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const runSequence = require("run-sequence");
const del = require("del");

const src = "./src";
const dist = "./dist";
const isProd = process.env.NODE_ENV === "production" || false;

const handleError = (err) => {
    console.log("\n")
    log(colors.red("Error!"))
    log("fileName: " + colors.red(err.fileName))
    log("lineNumber: " + colors.red(err.lineNumber))
    log("message: " + err.message)
    log("plugin: " + colors.yellow(err.plugin))
  }

gulp.task("json", () => {
    return gulp.src(`${src}/**/*.json`).pipe(isProd ? jsonminify() : through.obj()).pipe(gulp.dest(dist));
});

gulp.task("wxml", () => {
    return gulp.src(`${src}/**/*.wxml`).pipe(gulp.dest(dist));
});

gulp.task("wxs", () => {
    return gulp
        .src(`${src}/**/*.wxs`)
        .pipe(
            isProd 
            ? htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                keepClosingSlash: true
            })
            : through.obj()
        )
        .pipe(gulp.dest(dist));
});

gulp.task("wxss", () => {
    const combined = combiner.obj([
        gulp.src(`${src}/**/*.{wxss,scss}`),
        sass().on('error', sass.logError),
        postcss([pxtorpx(), base64()]),
        isProd ?
            cssnano({
                autoprefixer: false,
                discardComments: {removeAll: true}
            })
            :
            through.obj(),
        rename(path => (path.extname = ".wxss")),
        gulp.dest(dist)
    ]);
    combined.on("error", handleError);
});

gulp.task("images", () => {
    return gulp.src(`${src}/images/**`).pipe(gulp.dest(`${dist}/images`));
});

gulp.task("js", () => {
    const f = filter(file => !/(mock)/.test(file.path));
    gulp
        .src(`${src}/**/*.js`)
        .pipe(isProd ? f : through.obj())
        .pipe(
            isProd ?
            jdists({
                trigger: "prod"
            })
            :
            jdists({
                trigger: "dev"
            })
        )
        .pipe(isProd ? through.obj() : sourcemaps.init())
        .pipe(
            babel({
                presets: ["@babel/preset-env"]
            })
        )
        .pipe(
            isProd
            ?
            uglify({
                compress: true
            })
            :
            through.obj()
        )
        .pipe(isProd ? through.obj() : sourcemaps.write("./"))
        .pipe(gulp.dest(dist));
});

gulp.task("watch", () => {
    ["wxml", "wxss", "js", "json", "wxs"].forEach(v => {
        gulp.watch(`${src}/**/*.${v}`, [v]);
    });
    gulp.watch(`${src}/images/**`, ["images"]);
    gulp.watch(`${src}/images/**/*.scss`, ["wxss"]);
});

gulp.task("clean", () => {
    return del(["./dist/**"]);
});

gulp.task("dev", ["clean"], () => {
    runSequence("json", "images", "wxml", "wxss", "js", "wxs", "cloud", "watch");
});

gulp.task("build", ["clean"], () => {
    runSequence("json", "images", "wxml", "wxss", "js", "wxs", "cloud");
});


// cloud-functions 处理方法
const cloudPath = "./server/cloud-functions";
gulp.task("cloud", () => {
  return gulp
    .src(`${cloudPath}/**`)
    .pipe(
      isProd
        ? jdists({
            trigger: "prod"
          })
        : jdists({
            trigger: "dev"
          })
    )
    .pipe(gulp.dest(`${dist}/cloud-functions`));
});

gulp.task("watch:cloud", () => {
    gulp.watch(`${cloudPath}/**`, ["cloud"]);
});
  
gulp.task("cloud:dev", () => {
    runSequence("cloud", "watch:cloud");
});