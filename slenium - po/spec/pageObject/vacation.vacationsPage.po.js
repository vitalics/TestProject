const protractor = require('protractor');
const constants = require('../../helpers/constants/index.js');
const vacation = require('../../helpers/constants/pages/myVacation.page')

const browser = protractor.browser;

class RequestPage {

    constructor() { }

    get vacationList() {
        return protractor.element.all(protractor.by.css(vacation.CSS_SELECTORS.ITEMS.vacation_list));
    }
    get alertMessage() {
        return protractor.element(protractor.by.css(vacation.CSS_SELECTORS.TEXTS.request_popup_message_successful));
    }
    /**
     * @param {ElementArrayFinder} vacationList
     * @param {number} index
     * @return {WebElement}
     */
    getCurrentVacation(vacationList, index) {
        return vacationList[index];
    }

    /**
     * @param {WebElement} currentVacation
     * @return {string}
     */
    getCurrentVacationLink(currentVacation) {
        let vacationLink = '';
        currentVacation.getAttribute('data-href').then(text => {
            vacationLink = text;
            return vacationLink;
        });
    }

    /**
     * @description abstract method
     */
    static createInstance() {
        return new RequestPage();
    }
}

module.exports = RequestPage;