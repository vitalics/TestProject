let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
require('protractor/built/logger').Logger.logLevel = 2;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        silent: false,
        restartBrowserBetweenTests: true,
        defaultTimeoutInterval: 360000,
        print: function () {
        }
    },
    specs: [
        './spec/vacation.setup.spec.js',
        './spec/vacation.update.spec.js',
        './spec/vacation.remove.spec.js'
    ],
    seleniumAddress: 'http://localhost:4444/wd/hub',
    multiCapabilities: [
        {
            browserName: 'chrome',
            'chromeOptions': {
                args: ['--test-type'],
            }
        },
        {
            browserName: 'firefox',
            marionette: true,
        }
    ],
    verboseMultiSessions: true,
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
