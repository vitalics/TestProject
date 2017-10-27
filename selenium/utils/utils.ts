import { WebElement, WebDriver, Locator, WebElementCondition, until } from "selenium-webdriver";

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
    async waitForElement(locator: Locator, timeout?: number): Promise<WebElement> {
        if (!timeout) {
            timeout = 500
        }
        return this.driver.wait(until.elementLocated(locator), timeout);
    };
    async createLogger(isVerbose?: boolean, logLevel?: boolean): Promise<Logger> {
        return Logger.createLogger();
    }
}

class Logger {
    private constructor(isVerbose?: boolean, logLevel?: boolean) { }
    static createLogger(isVerbose?: boolean, logLevel?: boolean): Logger {
        return new Logger(isVerbose, logLevel);
    }

}