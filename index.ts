import * as chai from "chai";
import { Builder, until, By, Browser, Button, WebElement, WebElementCondition, Locator, WebDriver } from "selenium-webdriver";
let expect = chai.expect;

import { Utils } from "./utils";

let chrome = new Builder()
  .forBrowser(Browser.CHROME)
  .build();

const getTitle = async () => {
  chrome.wait(until.titleContains('VACATION'));
  return chrome.getTitle();
}
/**
 * @function async function
 */
const getVacationButton = async () => {
  const selector: string = "div>a#addVac";
  let addVacButton: WebElement = waitForVisibleElement(chrome, chrome.findElement(By.css(selector))).then(elem => addVacButton = elem);
  // chrome.wait(until.elementIsVisible(chrome.findElement(By.css(selector))), 5000);
  // = chrome.findElement(By.css(selector));
  return addVacButton;
}

const waitForPreloader = () => {
  const preloader =
    chrome.wait(until.elementIsVisible(chrome.findElement(By.className('block-layer'))))
  return preloader;
}

const getDraftButton = async () => {
  var selector = 'li.left>button#draft'
  let draftButton = chrome.wait(until.elementIsEnabled(chrome.findElement(By.css(selector))));
  return draftButton;
}

chrome.get("https://vacation.epam.com");

getTitle().then(title => console.log(title));

getVacationButton().then(button => button.isDisplayed().then((isDisplayed) => {
  console.log(isDisplayed)
  button.getText().then(text => console.log(text))
  if (isDisplayed) {
    button.click();
  }
})).catch(err => console.error(err));

chrome.executeScript(() => {
  window.scroll(0, 0)
});

getDraftButton().then(button => {
  button.click();
})