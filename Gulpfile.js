var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    del = require('del');

var paths = {
  jsSrc: [
    'path/to/a/file.js',
    'oh/nice/globs/*.js',
    'whoa/dude/**/*.js'
  ],
  cssSrc: [
    'path/to/css/file.css',
    'css/stylin/on/*.css',
    'path/**/*.css'
  ],
  others: [
    'path/to/some/html/*.html'
  ]
};

gulp.task('clean', function(cb) {
  del(['dist/'], cb);
});

gulp.task('scripts', [], function() {
  return gulp.src(paths.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('main.min.js'))
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('css', [], function() {
  return gulp.src(paths.cssSrc)
    .pipe(sourcemaps.init())
      .pipe(concat('stylin.css'))
      .pipe(gulp.dest('dist'))
      .pipe(rename('stylin.min.css'))
      .pipe(minifyCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('dev', function() {
  livereload.listen();
  gulp.watch(paths.jsSrc, ['default']);
  gulp.watch(paths.cssSrc, ['default']);
  gulp.watch(paths.others).on('change', livereload.changed);
});

gulp.task('default', ['clean', 'scripts', 'css']);
