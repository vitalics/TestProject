const protractor = require('protractor');
const constants = require('../../helpers/constants/index.js');
const requestFormCreatePage = require('../../helpers/constants/pages/requestForm.page.js')

const browser = protractor.browser;

class RequestFormCreatePage {
    constructor() {
    }
    get employee() {
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.INPUTS.employee));
    }
    get approver() {
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.TEXTS.approver));
    }
    get leavePayType() {
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.TEXTS.leave_pay_type))
    }
    get comment() {
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.TEXTAREA.comment))
    }
    get commentText() {
        return this.comment.getText();
    }
    /**
     * @param {string} keys
     */
    bindComment(keys) {
        this.comment.sendKeys(keys);
    }
    get draftButton() {
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.BUTTONS.save_as_draft))
    }
    /**
     * @description abstract method
     */
    static createInstance() {
        return new RequestFormCreatePage();
    }
}
module.exports = RequestFormCreatePage;
