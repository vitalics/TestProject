"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const selenium_webdriver_1 = require("selenium-webdriver");
let expect = chai.expect;
const browsers = {
    chrome: "chrome",
    firefox: "firefox",
    opera: "opera"
};
let firefox = new selenium_webdriver_1.Builder().forBrowser(browsers.firefox).build();
firefox.get("https://vacation.epam.com").then(() => firefox
    .manage()
    .timeouts()
    .implicitlyWait(1000));
firefox.wait(() => {
    firefox
        .getTitle()
        .then(title => {
        if (title == "") {
            console.log("wrong");
        }
        else {
            console.log(title);
        }
    })
        .catch(err => console.error(err))
        .catch(() => firefox.quit());
}, 1000);
//# sourceMappingURL=index.js.map