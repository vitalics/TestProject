import * as chai from "chai";
import { Builder } from "selenium-webdriver";
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
firefox.wait(() => {
  firefox
    .getTitle()
    .then(title => {
      if (title == "") {
        console.log("wrong");
      } else {
        console.log(title);
      }
    })
    .catch(err => console.error(err))
    .catch(() => firefox.quit());
}, 1000);
