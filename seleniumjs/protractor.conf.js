let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
// https://github.com/angular/protractor/issues/1451
require('protractor/built/logger').Logger.logLevel = 1;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        silent: true,
        restartBrowserBetweenTests: true,
        defaultTimeoutInterval: 360000,
        print: function () {
        }
    },
    specs: [
        './spec/vacation.setup.spec.js',
        './spec/vacation.remove.spec.js'
    ],
    capabilities: {
        browserName: 'chrome',
        'chromeOptions': {
            args: ['--test-type']
        }
    },
    onPrepare: function () {
        jasmine.getEnv().addReporter(new SpecReporter(
            {
                spec: {
                    displayStacktrace: true,
                },
                summary: {
                    displayDuration: false
                }
            }));
        jasmine.getEnv().addReporter(new Jasmine2HtmlReporter({
            savePath: './spec/reports/',
            cleanDestination: true,
            fileName: 'index',
        }))
    }
};
