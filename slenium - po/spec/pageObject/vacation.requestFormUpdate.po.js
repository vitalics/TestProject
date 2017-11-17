const protractor = require('protractor');
const constants = require('../../helpers/constants/index.js');
const requestFormUpdateSelectors = require('../../helpers/constants/selectors/updateVacation.selectors')

const browser = protractor.browser;

class RequestFormUpdatePage {
    constructor() { }
    get employee() {
        return protractor.element(protractor.by.xpath(requestFormUpdateSelectors.X_PATHS.update_form_user_name));
    }
    get updateButton() {
        return protractor.element(protractor.by.css(requestFormUpdateSelectors.CSS_SELECTORS.BUTTONS.update_request));
    }
    get leavePayType() {
        return protractor.element(protractor.by.xpath(requestFormUpdateSelectors.X_PATHS.pay_type))
    }

    /**
     *@description fabrical method 
     */
    static createInstance() {
        return new RequestFormUpdatePage();
    }
}
module.exports = RequestFormUpdatePage;
