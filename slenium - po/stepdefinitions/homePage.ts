import { browser } from "protractor";
import { HomePageObject } from "../pages/homePage";
const { Given, When, Then } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const home: HomePageObject = new HomePageObject();

Given(/^I am on home page$/, async () => {
    await expect(browser.getTitle()).to.eventually.equal("VACATION - EPAM Vacation Tracking System");
});

When(/^I am click add new vacation$/, async () => {
    // await browser.actions().
})
