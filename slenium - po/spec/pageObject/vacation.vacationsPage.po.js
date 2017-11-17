const protractor = require('protractor');

const constants = require('../../helpers/constants/index.js');
const vacationSelectors = require('../../helpers/constants/selectors/myVacation.selectors')

const basicPage = require('./abstractPage.po.js');

const browser = protractor.browser;

class RequestPage extends basicPage {

    constructor() {
        super();
    }

    load() {
        browser.get(constants.URL + '/vacations/type/me')
    }

    get vacationList() {
        return protractor.element.all(protractor.by.css(vacationSelectors.CSS_SELECTORS.ITEMS.vacation_list));
    }
    get lastVacation() {
        return this.vacationList.last();
    }
    get dropdown() {
        return this.lastVacation.element(protractor.by.css(vacationSelectors.CSS_SELECTORS.BUTTONS.vacation_action_dropdown));
    }
    get dropdownUpdateButton() {
        return this.dropdown.element(protractor.by.css(vacationSelectors.CSS_SELECTORS.BUTTONS.dropdown_update_request));
    }
    get dropdownDeleteButton() {
        return this.dropdown.element(protractor.by.css(vacationSelectors.CSS_SELECTORS.BUTTONS.dropdown_delete_request));
    }
    get alertMessage() {
        return protractor.element(protractor.by.css(vacationSelectors.CSS_SELECTORS.TEXTS.request_popup_message_successful));
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
     * @description fabrical method
     */
    static createInstance() {
        return new RequestPage();
    }
}

module.exports = RequestPage;