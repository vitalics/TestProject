const protractor = require('protractor');
const constants = require('../../helpers/constants/index.js');
const requestFormCreatePage = require('../../helpers/constants/pages/requestForm.page.js')
const basicPage = require('./abstractPage.po.js');

const browser = protractor.browser;

class RequestFormCreatePage extends basicPage {
    constructor() {
        super();
    }
    /**
     * @description fabrical method
     */
    static createInstance() {
        return new RequestFormCreatePage();
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
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.TEXTAREA.comment));
    }
    get commentText() {
        return this.comment.getText();
    }
    set commentText(text) {
        this.comment.sendKeys(text);
    }
    get draftButton() {
        return protractor.element(protractor.by.css(requestFormCreatePage.CSS_SELECTORS.BUTTONS.save_as_draft))
    }
    load() {
        throw new Error(`load function is not implement`);
     }
}

module.exports = RequestFormCreatePage;
