var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var typescript = require('gulp-tsc');
var runSequence = require('run-sequence');
var protractor = require("gulp-protractor").protractor;
var webdriver_update = require('gulp-protractor').webdriver_update_specific;

// Downloads the selenium webdriver - stupid solution to pass extra args like ignore_ssl
gulp.task('webdriver_update', webdriver_update({
    webdriverManagerArgs: ['--ignore_ssl']
}));

let specs = [
    './spec/vacation.setup.spec.js',
    './spec/vacation.update.spec.js',
    './spec/vacation.remove.spec.js'
];

gulp.task('test', () => {
    gulp.src(specs)
        .pipe(protractor({
            configFile: "./protractor.conf.js",
            args: [
                '--baseUrl', 'http://127.0.0.1:8000',
                '--params.environment', 'test'
            ]
        }))
        .on('error', function (e) { throw e })
});

gulp.task('default', ['webdriver_update', 'test']);
