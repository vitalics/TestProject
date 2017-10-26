import * as chai from "chai";
import { Builder, until, By, Browser, Button } from "selenium-webdriver";
let expect = chai.expect;

let firefox = new Builder()
  .forBrowser(Browser.CHROME)
  .build();

const getTitle = async () => {
  firefox.wait(until.titleContains('VACATION'));
  return firefox.getTitle();
}

const getButton = () => {
  // firefox.wait(until.elementIsVisible(firefox.findElement(By.id('addVac'))));
  const addVacButton = firefox.findElement(By.css('a#addVac'));
  return addVacButton;
}
const waitForPreloader = () => {
  const preloader =
    firefox.wait(until.elementIsVisible(firefox.findElement(By.className('block-layer'))))
  return preloader;
}
firefox.get("https://vacation.epam.com");

getTitle().then(title => console.log(title));
firefox.sleep(10000).then();
// waitForPreloader().then((preloader) => console.log(preloader.getLocation()))

getButton().then(button => button.isDisplayed().then((isDisplayed) => {
  console.log(isDisplayed)
  button.getText().then(text => console.log(text + 'some'))
  if (isDisplayed) {
    button.click();
  }
}));
