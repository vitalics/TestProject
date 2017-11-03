const CONSTANTS = require('../helpers/constants.js');
const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;

browser.waitForAngularEnabled(false);

let vacationList = [];
let currentVacation;
let dropdownButton;

describe('remove vacation', () => {
    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    })
    it('load site', () => {
        browser.get(CONSTANTS.URL + '/vacations/type/me');
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('vacation list should be non empty', () => {
        let vacationList = browser.findElements(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.ITEMS.vacation_list)).then(elements => {
            currentVacation = elements[elements.length - 1];
            expect(elements.length).toBeGreaterThan(0);
        });
    });
    it('click to dropdown "Action" column', () => {
        dropdownButton = currentVacation.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.BUTTONS.vacation_action_dropdown))
        expect(dropdownButton.isDisplayed()).toBeTruthy();
        browser.actions().click(dropdownButton).perform();
    })
    it('click "Delete request" on dropdown actions', () => {
        updateRequestButton = currentVacation.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.BUTTONS.dropdown_delete_request));
        expect(updateRequestButton.isDisplayed()).toBeTruthy();
        browser.actions().click(updateRequestButton).perform();
    });
    it('should see "Request successfully deleted" message', () => {
        let successfullMessage = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.TEXTS.request_popup_message_successful));
        expect(successfullMessage.getText()).toEqual('Request successfully deleted')
    })
});
