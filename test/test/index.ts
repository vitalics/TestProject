import * as chai from "chai";
import { Builder, until, By, Browser, Button, WebElement } from "selenium-webdriver";
let expect = chai.expect;

let chrome = new Builder()
  .forBrowser(Browser.CHROME)
  .build();

const getTitle = async () => {
  chrome.wait(until.titleContains('VACATION'));
  return chrome.getTitle();
}

const getButton = async () => {
  // firefox.wait(until.elementIsVisible(firefox.findElement(By.id('addVac'))));
  const addVacButton = chrome.findElement(By.css("a[href='/epm-vts-web/vacations/add']"));
  return addVacButton;
}
const waitForPreloader = () => {
  const preloader =
    chrome.wait(until.elementIsVisible(chrome.findElement(By.className('block-layer'))))
  return preloader;
}
chrome.get("https://vacation.epam.com");

// getTitle().then(title => console.log(title));
// chrome.sleep(10000).then();
// // waitForPreloader().then((preloader) => console.log(preloader.getLocation()))

// getButton().then(button => button.isDisplayed().then((isDisplayed) => {
//   console.log(isDisplayed)
//   button.getText().then(text => console.log(text + 'some'))
//   if (isDisplayed) {
//     button.click();
//   }
// }));

chrome.sleep(5000);
var button: WebElement;
getButton().then(elem => button = elem)
chrome.wait(() => {
  until.elementTextContains(button, 'Add vacation')
}, 10000)
  .then(() => {
    button.click();
  });