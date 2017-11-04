const CONSTANTS = require('../helpers/constants/index.js');
const MAIN = require('../helpers/constants/pages/main.page.js');
const ADDVAC = require('../helpers/constants/pages/addVacation.page.js');
const MYVACS = require('../helpers/constants/pages/myVacation.page.js');
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
let fillUsername_text;

describe('Set up vacation.', () => {
    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    })
    it('Load site', () => {
        browser.get(CONSTANTS.URL);
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('Click "add vacation" button', () => {
        // let addVacButton = browser.findElement(PROTRACTOR.By.css(CONSTANTS.CSS_SELECTORS.BUTTONS.add_new_vacation));
        let addVacButton = browser.findElement(PROTRACTOR.by.css(MAIN.CSS_SELECTORS.BUTTONS.add_new_vacation));
        expect(addVacButton.isDisplayed()).toBeTruthy();
        browser.actions().click(addVacButton).perform();
    });
    it('Locate on request form', () => {
        expect(browser.getCurrentUrl()).toContain('/vacations/add')
    });
    describe('Check default form fields on "Student" position.', () => {
        beforeEach(() => {
            expect(browser.getCurrentUrl()).toContain('/vacations/add')
        });
        it('"Employee" filed must be "Vitali Haradkou"', () => {
            username_element = browser.findElement(PROTRACTOR.by.css(ADDVAC.CSS_SELECTORS.INPUTS.employee))
            let currentFillUsername = browser.findElement(PROTRACTOR.by.css(ADDVAC.CSS_SELECTORS.TEXTS.user_name))
            expect(username_element.getAttribute('value')).toEqual('Vitali Haradkou');
        });
        it('"Approver" field should be "Kanstantsin Ausiannikau"', () => {
            approver_element = browser.findElement(PROTRACTOR.by.css(ADDVAC.CSS_SELECTORS.TEXTS.approver))
            expect(approver_element.getText()).toEqual('Kanstantsin Ausiannikau');
        });
        it('"Leave w/o pay type" field must be "General leave"', () => {
            leave_pay_type_element = browser.findElement(PROTRACTOR.by.css(ADDVAC.CSS_SELECTORS.TEXTS.leave_pay_type))
            expect(leave_pay_type_element.getText()).toEqual('General leave')
        });
        it('"Comment" filed should be empty', () => {
            comment_element = browser.findElement(PROTRACTOR.by.css(ADDVAC.CSS_SELECTORS.TEXTS.comment))
            expect(comment_element.getText()).toEqual('');
        });
    });
    describe('Fill vacation request form fields.', () => {
        beforeEach(() => {
            expect(browser.getCurrentUrl()).toContain('/vacations/add')
        });
        it('"Comment" field', () => {
            let commentText = 'some comment'
            browser.actions().click(comment_element).sendKeys('some comment').perform();
            expect(commentText).toEqual('some comment');
        });
    });
    it('Send request to draft', () => {
        let saveAsDraft_button = browser.findElement(PROTRACTOR.by.css(ADDVAC.CSS_SELECTORS.BUTTONS.save_as_draft))
        expect(saveAsDraft_button.isDisplayed()).toBeTruthy();
        browser.actions().click(saveAsDraft_button).click().perform();
    })
    it('Should redirect my vac page', () => {
        expect(browser.getCurrentUrl()).toContain('/vacations/type/me');
    });
    it('Should see "Request successfully saved" alert', () => {
        let popupMessage_element = browser.findElement(PROTRACTOR.by.css(MYVACS.CSS_SELECTORS.TEXTS.request_popup_message_successful))
        let popupMessage_text = popupMessage_element.getText();
        expect(popupMessage_text).toEqual('Request successfully saved');
    })
    it('Vacation list is not empty', () => {
        let vacationList = browser.findElements(PROTRACTOR.by.css(MYVACS.CSS_SELECTORS.ITEMS.vacation_list)).then(elements => {
            expect(elements.length).toBeGreaterThan(0);
        });
    })
});
