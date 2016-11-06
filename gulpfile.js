var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    connect = require('gulp-connect');

// copy static files
gulp.task('copy', function() {
    gulp.src('./src/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./dist'));
});

// watch static files
gulp.task('watch-copy', function() {
  gulp.watch('./src/**/*.{ttf,woff,eof,svg}',['copy']);
});

// compile sass
gulp.task('styles', function() {
    return gulp.src('./src/sass/**/*.scss', { sourcemap: true })
        //.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write('./public/css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

// watch sass
gulp.task('watch-sass', function() {
  gulp.watch('./src/sass/**/*.scss',['styles']);
});

// compile pug
gulp.task('pug', function buildHTML() {
  return gulp.src('./src/**/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('./dist/'));
});

// watch pug
gulp.task('watch-pug', function() {
  gulp.watch('./src/**/*.pug',['pug']);
});

// connect to a server
gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    port: 8888
  });
});

// build task
gulp.task('build', ['copy', 'styles', 'pug']);

// default task (Do a build and then watch for Sass changes)
gulp.task('default', ['build', 'watch-copy', 'watch-sass', 'watch-pug', 'connect']);
