// import { Executor } from './src/compiler';
const path = require('path');

exports.config = {
  seleniumAddress: 'http://localhost:4443/wd/hub',
  specs: [ './index.spec.ts' ],

  capabilities: {
    browserName: 'chrome',
    chromeOptions: { args: [ '--disable-popup-blocking', '--disable-translate' ] }
  },
  skipSourceMapSupport: true,
  directConnection: true,

  maxSessions: 15,
  allScriptsTimeout: 600000,
  getPageTimeout: 600000,

  debug: true,
  beforeLaunch: () => {
    require('ts-node').register();
    // require('jasmine-ts');
  },

  baseUrl: 'http://tele2.nl',
  onPrepare: () => {
    browser.waitForAngularEnabled(false);

    const { SpecReporter } = require('jasmine-spec-reporter');

    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      })
    );
  },

  onComplete: () => {},

  // highlightDelay: 100,

  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 240000,
    print: function() {}
  },

  SELENIUM_PROMISE_MANAGER: false
};
