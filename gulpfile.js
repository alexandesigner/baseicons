(function(require) {
  // Variables
  const gulp = require("gulp"),
    watch = require("gulp-watch"),
    sass = require("gulp-sass"),
    gutil = require("gulp-util"),
    connect = require("gulp-connect"),
    historyApiFallback = require("connect-history-api-fallback"),
    concat = require("gulp-concat"),
    changed = require("gulp-changed"),
    svgstore = require("gulp-svgstore"),
    svgmin = require("gulp-svgmin"),
    path = require("path");

  // Paths
  const paths = {
    scripts: ["./src/js/scripts.js"],
    scss: ["./src/scss/**/*.scss"],
    icons: ["./icons/*.svg"]
  };

  // Connect Port 8000
  gulp.task("connect", function() {
    connect.server({
      root: "src",
      livereload: true,
      port: 8000,
      middleware: function(connect, opt) {
        return [historyApiFallback({})];
      }
    });
  });

  // SCSS Styles
  gulp.task("styles", function() {
    return gulp
      .src(paths.scss)
      .pipe(sass({ outputStyle: "expanded", errLogToConsole: true }))
      .pipe(concat("styles.css"))
      .pipe(gulp.dest("src/css"))
      .pipe(connect.reload());
  });

  // Watch
  gulp.task("watch", function() {
    gulp.watch(paths.scss, ["styles"]);
  });

  // SVG Generate and Minify
  gulp.task("svgstore", function() {
    return gulp
      .src(paths.icons)
      .pipe(
        svgmin(function(file) {
          var prefix = path.basename(
            file.relative,
            path.extname(file.relative)
          );
          return {
            plugins: [
              {
                cleanupIDs: {
                  prefix: prefix + "-",
                  minify: true
                }
              }
            ]
          };
        })
      )
      .pipe(svgstore())
      .pipe(gulp.dest("./src/images"));
  });

  // Running Watch
  gulp.task("default", ["styles", "watch", "connect"]);
})(require);
