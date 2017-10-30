import { browser, protractor } from "protractor";
import { HomePageObject } from "../pages/searchPage";
const { When, Then } = require("cucumber");

const search: HomePageObject = new HomePageObject();

When(/^I type "(.*?)"$/, async (text) => {
    await search.searchTextBox.sendKeys(text);
});

Then(/^I click on search button$/, async () => {
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
});
