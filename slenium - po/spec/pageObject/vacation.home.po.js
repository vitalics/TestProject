const protractor = require('protractor');
const constants = require('../../helpers/constants/index.js');
const homePage = require('../../helpers/constants/pages/main.page.js')


const browser = protractor.browser;

class VacationHomePage {
    constructor() { }
    load() {
        browser.get(constants.URL)
    }
    get addVacButton() {
        return browser.element(protractor.by.css(homePage.CSS_SELECTORS.BUTTONS.add_new_vacation))
    }
    
    /**
     * @description abstract method
     */
    static createInstance() {
        return new VacationHomePage();
    }
}
module.exports = VacationHomePage;