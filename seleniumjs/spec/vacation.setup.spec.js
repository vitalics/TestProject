const CONSTANTS = require('../helpers/constants.js');
const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;

browser.waitForAngularEnabled(false);

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
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    })
    it('load site', () => {
        browser.get(CONSTANTS.URL);
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('click "add vacation" button', () => {
        let addVacButton = browser.findElement(PROTRACTOR.By.css(CONSTANTS.CSS_SELECTORS.BUTTONS.add_new_vacation));
        expect(addVacButton.isDisplayed()).toBeTruthy();
        browser.actions().click(addVacButton).perform();
    });
    it('locate on request form', () => {
        expect(browser.getCurrentUrl()).toContain('/vacations/add')
    });
    describe('check default form fields on "Student" position', () => {
        beforeEach(() => {
            expect(browser.getCurrentUrl()).toContain('/vacations/add')
        });
        it('"Employee" filed must be equals for logged in user', () => {
            username_element = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.INPUTS.employee));
            let currentUserName = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.TEXTS.user_name))
            username_text = username_element.getAttribute('value');
            expect(username_text).toEqual(currentUserName);
        });
        it('"Approver" field should be "Kanstantsin Ausiannikau"', () => {
            approver_element = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.TEXTS.approver))
            approver_text = approver_element.getText();
            expect(approver_text).toEqual('Kanstantsin Ausiannikau');
        });
        it('"Leave w/o pay type" field must be "General leave"', () => {
            leave_pay_type_element = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.TEXTS.leave_pay_type))
            leavePayType_text = leave_pay_type_element.getText();
            expect(leavePayType_text).toEqual('General leave')
        });
        it('"Comment" filed must be empty', () => {
            comment_element = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.TEXTS.comment))
            comment_text = comment_element.getText();
            expect(comment_text).toEqual('');
        });
    });
    describe('fill vacation request form fields', () => {
        beforeEach(() => {
            expect(browser.getCurrentUrl()).toContain('/vacations/add')
        });
        it('fill comment field', () => {
            let commentText = 'some comment'
            browser.actions().click(comment_element).sendKeys('some comment').perform();
            expect(commentText).toEqual('some comment');
        });
    });
    it('send request to draft', () => {
        let saveAsDraft_button = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.BUTTONS.save_as_draft))
        expect(saveAsDraft_button.isDisplayed()).toBeTruthy();
        browser.actions().click(saveAsDraft_button).click().perform();
    })
    it('should redirect my vac page', () => {
        expect(browser.getCurrentUrl()).toContain('/vacations/type/me');
    });
    it('should see "Request successfully saved" alert', () => {
        let popupMessage_element = browser.findElement(PROTRACTOR.By.css(CONSTANTS.CSS_SELECTORS.TEXTS.request_popup_message_successful));
        let popupMessage_text = popupMessage_element.getText();
        expect(popupMessage_text).toEqual('Request successfully saved');
    })
    it('vacation list is not empty', () => {
        let vacationList = browser.findElements(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.ITEMS.vacation_list)).then(element => {
            expect(element.length).toBeGreaterThan(0);
        });
    })
});
