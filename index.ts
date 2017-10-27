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
   * addNewVacation
   */
  public addNewVacation = async (): Promise<boolean> => {
    let isSuccess: boolean = false;
    this.chrome.get("https://vacation.epam.com");

    this.getTitle()
      .then(title => console.log(title))

    this.chrome.sleep(5000);
    return this.getVacationButton()
      .then(button => button.isDisplayed()
        .then((isDisplayed) => {
          button.getText()
            .then(text => console.log(text))
          if (isDisplayed) {
            return button.click()
              .then(() => {
                isSuccess = true;
                return isSuccess;
              });
          }
        }));
  }
  /**
   * secondPageScenarios
   */
  public submitToDraft = async (): Promise<boolean> => {
    let isEnd: boolean = false;

    this.chrome.executeScript(() => {
      window.scroll(0, 0)
    });

    this.chrome.sleep(5000);

    return this.getCommentArea()
      .then(textArea => {
        textArea.clear();
        textArea.sendKeys('some comment');
      })
      .then(() => {
        return this.getDraftButton()
          .then(button => button.click()
            .then(() => {
              isEnd = true;
              return isEnd;
            })
          )
      })
  }
  /**
   * deleteVacationFromDraft
   */
  public deleteVacationFromDraft = async (): Promise<boolean> => {
    let isFinished: boolean = false;
    const vacationUrl = 'https://vacation.epam.com/epm-vts-web/vacations/type/me#'
    return this.chrome.getCurrentUrl()
      .then(url => url === vacationUrl ? this.getDropdownOptions()
        .then(dropdownButton => dropdownButton.click()
          .then(() => {
            return this.getDeleteDraftButton()
              .then(button => button.click()
                .then(() => {
                  isFinished = true;
                  return isFinished;
                }))
          })) : this.chrome.get(vacationUrl).then(() => {
            this.chrome.sleep(5000);
            return this.getDropdownOptions()
              .then(dropdownButton => dropdownButton.click()
                .then(() => {
                  return this.getDeleteDraftButton()
                    .then(button => button.click()
                      .then(() => {
                        isFinished = true;
                        return isFinished;
                      }))
                }))
          }));
  }

  /**
   * closeBrowser 
   */
  public closeBrowser = async (): Promise<boolean> => {
    let isFinished: boolean = false;
    return this.chrome.quit().then(() => {
      isFinished = true;
      return isFinished;
    })
  }
  // #endregion
}

let main = new Main();
main.addNewVacation().then(isEnd => {
  console.log('success first scenario')
})
  .then(() => main.submitToDraft()
    .then(isEnd => console.log('success submit to draft'))
    .then(() => main.deleteVacationFromDraft()
      .then(isFinish => console.log('success delete vacation from draft'))
      .then(() => main.closeBrowser().then(isSuccess => console.log('succesfull close browser')))
    ));