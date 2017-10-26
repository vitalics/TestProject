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
let firefox = new selenium_webdriver_1.Builder()
    .forBrowser(selenium_webdriver_1.Browser.CHROME)
    .build();
const getTitle = () => __awaiter(this, void 0, void 0, function* () {
    firefox.wait(selenium_webdriver_1.until.titleContains('VACATION'));
    return firefox.getTitle();
});
const getButton = () => {
    // firefox.wait(until.elementIsVisible(firefox.findElement(By.id('addVac'))));
    const addVacButton = firefox.findElement(selenium_webdriver_1.By.css('a#addVac'));
    return addVacButton;
};
const waitForPreloader = () => {
    const preloader = firefox.wait(selenium_webdriver_1.until.elementIsVisible(firefox.findElement(selenium_webdriver_1.By.className('block-layer'))));
    return preloader;
};
firefox.get("https://vacation.epam.com");
getTitle().then(title => console.log(title));
firefox.sleep(10000).then();
// waitForPreloader().then((preloader) => console.log(preloader.getLocation()))
getButton().then(button => button.isDisplayed().then((isDisplayed) => {
    console.log(isDisplayed);
    button.getText().then(text => console.log(text + 'some'));
    if (isDisplayed) {
        button.click();
    }
}));
//# sourceMappingURL=index.js.map