'use strict';
var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  return gulp.src(['./sass/*.scss'])
    .pipe(sass())
    .pipe(concat('testform.css'))
    .pipe(gulp.dest('./assets/styles/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./sass/*.scss', gulp.series('sass'));
});
// Default Task
gulp.task('default', gulp.parallel('sass', 'watch'));
