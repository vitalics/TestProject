const protractor = require('protractor');

const constants = require('../../helpers/constants/index.js');
const homeSelectors = require('../../helpers/constants/selectors/main.selectors');

const basicPage = require('./abstractPage.po.js')

const browser = protractor.browser;

class VacationHomePage extends basicPage {
    constructor() {
        super();
    }
    /**
     * @description fabrical method
     */
    static createInstance() {
        return new VacationHomePage();
    }
    get addVacButton() {
        return browser.element(protractor.by.css(homeSelectors.CSS_SELECTORS.BUTTONS.add_new_vacation))
    }
    get title() {
        return browser.getTitle();
    }
    load() {
        browser.get(constants.URL)
    }
}
module.exports = VacationHomePage;