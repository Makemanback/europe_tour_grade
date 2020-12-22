"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var svgmin = require("gulp-svgmin");
var csso = require("gulp-csso");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify-es").default;
var pipeline = require("readable-stream").pipeline;

// минификация js
gulp.task("compress-js", function () {
  return pipeline(
    gulp.src("source/js/*.js"),
    uglify(),
    gulp.dest("build/js")
  );
});


// вставляем спрайт в разметку команда выполняется во время билда, до нее в разметке нет иконок
gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"));
});

// оптимизация свг за исключением спрайта
gulp.task("svgmin", function () {
  return gulp.src("source/img/*.svg, !source/img/sprite-min.svg")
    .pipe(svgmin({
      plugins: [{
        moveGroupAttrsToElems: false
      }
      ]
    }))
    .pipe(gulp.dest("source/img"));
});


// сборка спрайта
gulp.task("sprite", function () {
  return gulp.src("source/img/icon-*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite-min.svg"))
    .pipe(gulp.dest("source/img"));
});

// sass в css
gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// неминифицированный css

// очищаем папку build перед копированием
gulp.task("clean", function () {
  return del("build");
});

// копируем файлы в папку build
gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico",
    "source/*.html",
    "source/css/*.css"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

// запуск build
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "compress-js",
  "svgmin",
  "html",
));

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series(
      "sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

// обновление сервера
gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series("build", "server"));
