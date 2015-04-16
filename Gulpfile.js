var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    del = require('del');

var paths = {
  jsSrc: [
    'src/js/*.js'
  ],
  cssSrc: [
    'src/css/*.css'
  ],
  others: [
    'src/templates/*.html'
  ]
};

gulp.task('clean', function(cb) {
  del(['dist/'], cb);
});

gulp.task('scripts', [], function() {
  return gulp.src(paths.jsSrc)
    .pipe(sourcemaps.init())
    .pipe(uglify({
      mangle: false
    }))
    .pipe(concat('dist.min.js'))
    .pipe(sourcemaps.write('./map', {
      'includeContent': true,
      'sourceRoot': 'src/js/'
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('css', [], function() {
  return gulp.src(paths.cssSrc)
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat('dist.min.css'))
    .pipe(sourcemaps.write('./map', {
      'includeContent': true,
      'sourceRoot': 'src/css/'
    }))
    .pipe(gulp.dest('dist'))
});

// Rerun gulp when a file changes
gulp.task('dev', ['default'], function() {
    gulp.watch(paths.jsSrc, ['default']);
    gulp.watch(paths.cssSrc, ['default']);
    // Trigger livereload only when loadable assets are changed (new images, html updated.)
    gulp.watch(paths.others).on('change', livereload.changed);
    gulp.watch(['dist/*']).on('change', livereload.changed);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'scripts', 'css']);
