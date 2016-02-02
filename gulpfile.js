'use strict';

var autoprefixer = require('autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('./sass/app.scss')
    .pipe(
      sass({
        outputStyle: 'compressed'
      }).on('error', sass.logError)
    )
    .pipe(postcss([ autoprefixer() ]))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
  return browserify('./js/app.js')
    .transform(babelify)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('watch:sass', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch:js', function () {
    gulp.watch('./js/*.js', ['js']);
});
