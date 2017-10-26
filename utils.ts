import { WebElement, WebDriver, Locator, WebElementCondition, until } from "selenium-webdriver";
import { singleton } from "./decorators/singleton";

@singleton
export class Utils {
    constructor(private driver: WebDriver) { }
    async waitForVisibleElement(locator: Locator, timeout?: number): Promise<WebElement> {
        if (!timeout) {
            timeout = 500
        }
        const element = this.driver.wait(until.elementLocated(locator), timeout);
        return this.driver.wait(new WebElementCondition('for element to be visible ' + locator, () => {
            return element.isDisplayed().then(v => v ? element : null);
        }), timeout);
    }
}