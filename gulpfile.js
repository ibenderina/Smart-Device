const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const server = require("browser-sync").create();
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require('gulp-svgstore');
const del = require("del");
const uglify = require("gulp-uglify");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const pipeline = require("readable-stream").pipeline;

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({
      browsers: ["last 4 versions"]
    })
  ]))
  .pipe(rename("style.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/logo-*.svg",
    "source/*.ico",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));

});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("html", function () {
  return gulp.src([
    "source/*.html",
  ], {
    base: "source"
  })
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest("build"));
});

gulp.task("js", function () {
  return gulp.src([
    "source/js/*.js",
  ], {
    base: "source/js"
  })
  .pipe(gulp.dest("build/js"));
});

gulp.task("minify-js", function () {
  return pipeline(
    gulp.src("source/js/vendor.js"),
    uglify(),
    rename("vendor.min.js"),
    gulp.dest("build/js")
  );
});

gulp.task("sprite", function () {
  return gulp.src("source/img/*.svg")
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
});

gulp.task("build", gulp.series(
  "clean",
  "images",
  "webp",
  "sprite",
  "css",
  "html",
  "copy",
  "js",
  "minify-js"
));
gulp.task("start", gulp.series("build", "server"));
