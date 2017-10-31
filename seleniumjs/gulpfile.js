var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var typescript = require('gulp-tsc');
var runSequence = require('run-sequence');

gulp.task('test', function () {
    return gulp.src('spec/*.js')
        .pipe(jasmine());
});
