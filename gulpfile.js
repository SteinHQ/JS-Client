const gulp = require("gulp"),
  babel = require("gulp-babel"),
  rename = require("gulp-rename"),
  webpack = require("webpack-stream"),
  terser = require("gulp-terser");

gulp.task("default", () =>
  gulp
    .src("src/index.js")
    .pipe(webpack())
    .pipe(rename("bundle.min.js"))
);
