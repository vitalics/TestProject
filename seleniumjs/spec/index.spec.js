const JASMINE = require('jasmine');
const WEBDRIVER = require('selenium-webdriver');

let chrome;

let test = new JASMINE().configureDefaultReporter({
    onComplete: function (passed) {
        if (passed) {
            exit(0);
        }
        else {
            exit(1);
        }
    },
    timer: new this.jasmine.Timer(),
    print: function () {
        process.stdout.write(util.format.apply(this, arguments));
    },
    showColors: true,
    jasmineCorePath: this.jasmineCorePath
});

describe("Set up vacation", () => {
    beforeAll(() => {
        chrome = new WEBDRIVER.Builder()
            .forBrowser(WEBDRIVER.Browser.CHROME)
            .build();
    })
    it("contains spec with an expectation", () => {
        expect(true).toBe(true);
    });
});