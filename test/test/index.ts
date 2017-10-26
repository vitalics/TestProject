import * as chai from "chai";
import { Builder, until } from "selenium-webdriver";
let expect = chai.expect;

const browsers = {
  chrome: "chrome",
  firefox: "firefox",
  opera: "opera"
};

let firefox = new Builder().forBrowser(browsers.firefox).build();

firefox.get("https://vacation.epam.com").then(() =>
  firefox
    .manage()
    .timeouts()
    .implicitlyWait(1000)
);
const getTitle = async () => {
  firefox.wait(until.titleContains('VACATION'));
  return firefox.getTitle();
}
getTitle().then(title => console.log(title))

