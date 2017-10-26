"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const getTitle = () => __awaiter(this, void 0, void 0, function* () {
    firefox.wait(selenium_webdriver_1.until.titleContains('VACATION'));
    return firefox.getTitle();
});
getTitle().then(title => console.log(title));
// firefox.wait(until () => {
//   firefox
//     .getTitle()
//     .then(title => {
//       if (title == "") {
//         console.log("wrong");
//       } else {
//         console.log(title);
//       }
//     })
//     .catch(err => console.error(err))
//     .catch(() => firefox.quit());
// }, 1000);
//# sourceMappingURL=index.js.map