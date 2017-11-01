const CONSTANTS = require('../helpers/constants.js');
const PROTRACTOR = require('protractor');

PROTRACTOR.browser.waitForAngularEnabled(false);
/**
 * @type {WebElementPromise}
 */
let comment_element;
let leave_pay_type_element;
let approver_element;
let username_element;

let comment_text;
let leavePayType_text;
let approver_text;
let username_text;

describe('set up vacation', () => {
    beforeEach(() => {
        PROTRACTOR.browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    })
    it('load site', () => {
        PROTRACTOR.browser.get(CONSTANTS.URL);
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('click "add vacation" button', () => {
        let addVacButton = PROTRACTOR.browser.findElement(PROTRACTOR.By.css(CONSTANTS.CSS_SELECTORS.add_new_vacation_button));
        expect(addVacButton.isDisplayed()).toBeTruthy();
        PROTRACTOR.browser.actions().click(addVacButton).perform();

    });
    it('locate on request form', () => {
        expect(PROTRACTOR.browser.getCurrentUrl()).toContain('/vacations/add')
    });
    describe('check vacation request form fields', () => {
        const COUNTOFTESTS = 4;
        let succesfulTests = 0;
        beforeEach(() => {
            expect(PROTRACTOR.browser.getCurrentUrl()).toContain('/vacations/add')
        });
        it('check "Employee" filed', () => {
            username_element = PROTRACTOR.browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.employee_input))
            username_text = username_element.getAttribute('value');
            if (expect(username_text).toEqual('Vitali Haradkou')) {
                succesfulTests++;
            }
        });
        it('check "Approver" field', () => {
            approver_element = PROTRACTOR.browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.approver_text))
            approver_text = approver_element.getText();
            if (expect(approver_text).toEqual('Kanstantsin Ausiannikau')) {
                succesfulTests++;
            }
        });
        it('check "Leave w/o pay type" field', () => {
            leave_pay_type_element = PROTRACTOR.browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.leave_pay_type_text))
            leavePayType_text = leave_pay_type_element.getText();
            if (expect(leavePayType_text).toEqual('General leave')) {
                succesfulTests++;
            }
        });
        it('check "Comment" filed', () => {
            comment_element = PROTRACTOR.browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.comment_text))
            comment_text = comment_element.getText();
            if (expect(comment_text).toEqual('')) {
                succesfulTests++;
            }
        });
        afterAll(() => {
            expect(succesfulTests).toEqual(COUNTOFTESTS);
        })
    });
    describe('fill vacation request form fields', () => {
        beforeEach(() => {
            expect(PROTRACTOR.browser.getCurrentUrl()).toContain('/vacations/add')
        });
        it('fill comment field', () => {
            let commentText = 'some coment'
            PROTRACTOR.browser.actions().click(comment_element).sendKeys('some coment').perform();
            expect(commentText).toEqual('some coment');
        });
    });
    it('send request to draft', () => {
        let saveAsDraft_button = PROTRACTOR.browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.save_as_draft_button))
        expect(saveAsDraft_button.isDisplayed()).toBeTruthy();
        PROTRACTOR.browser.actions().click(saveAsDraft_button).click().perform();


    })
    it('should redirect my vac page', () => {
        expect(PROTRACTOR.browser.getCurrentUrl()).toContain('/vacations/type/me');
    });
    it('should add vacation successfull', () => {
        let popupMessage_element = PROTRACTOR.browser.findElement(PROTRACTOR.By.css(CONSTANTS.CSS_SELECTORS.request_popup_message_successful));
        let popupMessage_text = popupMessage_element.getText();
        expect(popupMessage_text).toEqual('Request successfully saved');
    })
    afterAll(() => {
        PROTRACTOR.browser.quit()
    })
});
