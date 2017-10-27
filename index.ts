import * as chai from "chai";
import { Builder, until, By, Browser, Button, WebElement, WebElementCondition, Locator, WebDriver } from "selenium-webdriver";
let expect = chai.expect;

import { Utils } from "./utils";
class Main {
  private chrome: WebDriver;
  private utils: Utils;

  constructor() {

    this.chrome = new Builder()
      .forBrowser(Browser.CHROME)
      .build();

    this.utils = new Utils(this.chrome);
  }
  // #region private_methods
  private getTitle = async () => {
    this.chrome.wait(until.titleContains('VACATION'));
    return this.chrome.getTitle();
  }
  /**
 * @method async method
 */
  private getVacationButton = async (): Promise<WebElement> => {
    const selector: string = "div>a#addVac";

    let addVacButton = this.chrome.findElement(By.css(selector));
    return this.chrome.wait(() => {
      return addVacButton;
    })
  }
  private getDraftButton = async () => {
    const selector = 'li.left>button#draft'
    let draftButton = this.chrome.wait(until.elementIsEnabled(this.chrome.findElement(By.css(selector))));
    return draftButton;
  }
  private getCommentArea = async (): Promise<WebElement> => {
    const selector = 'div.textarea [name="comment"]#comment';
    let commentArea = this.chrome.findElement(By.css(selector));
    return this.chrome.wait(() => {
      return commentArea;
    });
  }
  private getDropdownOptions = async (): Promise<WebElement> => {
    const selector = ".dropdown.actions .dropdown-toggle";
    let dropdownOptionsButton = this.chrome.findElement(By.css(selector));
    return this.chrome.wait(() => {
      return dropdownOptionsButton;
    })
  }
  private getDeleteDraftButton = async (): Promise<WebElement> => {
    const selector = "ul.dropdown-menu[role='menu'] [title='Delete Request']";
    let deleteRequestButton = this.chrome.findElement(By.css(selector));
    return this.chrome.wait(() => {
      return deleteRequestButton;
    })
  }
  // #endregion

  // #region scenarios
  /**
   * firtstPageScenario
   */
  public firtstPageScenario = async (): Promise<boolean> => {
    let isEnd: boolean = false;
    this.chrome.get("https://vacation.epam.com");

    this.getTitle().then(title => console.log(title))

    this.chrome.sleep(5000);
    return this.getVacationButton().then(button => button.isDisplayed().then((isDisplayed) => {
      button.getText().then(text => console.log(text))
      if (isDisplayed) {
        return button.click().then(() => {
          isEnd = true;
          return isEnd;
        });
      }
    }));
  }
  /**
   * secondPageScenarios
   */
  public secondPageScenarios = async (): Promise<boolean> => {
    let isEnd: boolean = false;

    this.chrome.executeScript(() => {
      window.scroll(0, 0)
    });

    this.chrome.sleep(5000);

    return this.getCommentArea().then(textArea => {
      textArea.clear();
      textArea.sendKeys('some comment');
    })
      .then(() => {
        return this.getDraftButton().then(button => button.click()
          .then(() => {
            this.chrome.sleep(5000);
            return this.getDropdownOptions().then(dropdownButton => dropdownButton.click()
              .then(() => {
                return this.getDeleteDraftButton().then(button => button.click()
                  .then(() => {
                    isEnd = true;
                    return isEnd;
                  }))
              }))
          })
          // .then(() => {
          //   isEnd = true;
          //   return isEnd;
          // })
        )
      })
  }
  // #endregion
}

let main = new Main();
main.firtstPageScenario().then(isEnd => {
  console.log('success first scenario')
})
  .then(() => main.secondPageScenarios()
    .then(isEnd => console.log('success second scenario')
    ));