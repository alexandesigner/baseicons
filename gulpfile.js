(function (require) {

  // Variables
  var gulp = require('gulp');
  var watch = require('gulp-watch');
  var sass = require('gulp-sass');
  var gutil = require('gulp-util');
  var connect = require('gulp-connect');
  var historyApiFallback = require('connect-history-api-fallback');
  var concat = require('gulp-concat');
  var changed = require('gulp-changed');
  var svgstore = require('gulp-svgstore');
  var svgmin = require('gulp-svgmin');
  var path = require('path');

  // Paths
  var paths = {
    scripts:  ['./app/js/scripts.js'],
    scss:     ['./app/src/scss/**/*.scss'],
    icons:    ['./icons/*.svg']
  };

  // Connect Port 8000
  gulp.task('connect', function() {
    connect.server({
      root: 'app',
      livereload: true,
      port: 8000,
      middleware: function(connect, opt) {
        return [ historyApiFallback({}) ];
      }
    });
  });

  // SCSS Styles
  gulp.task('styles', function () {
    return gulp.src(paths.scss)
      .pipe(sass({outputStyle: 'expanded', errLogToConsole: true}))
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('app/css'))
      .pipe(connect.reload());
  });

  // Watch
  gulp.task('watch', function() {
    gulp.watch(paths.scss, ['styles']);
  });

  // SVG Generate and Minify
  gulp.task('svgstore', function () {
    return gulp.src(paths.icons)
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./dest'));
  });

  // Running Watch
  gulp.task('default', [ 'styles', 'watch', 'connect' ]);

}(require));
