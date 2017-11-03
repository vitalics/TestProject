const CONSTANTS = require('../helpers/constants.js');
const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;

browser.waitForAngularEnabled(false);

let updateRequestLink = '';
let updateRequestButton;
let currentVacation;
let dropdownButton;

describe('update vacation', () => {
    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    });
    it('should load my vacations', () => {
        browser.get(CONSTANTS.URL + '/vacations/type/me');
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('vacation list should be non empty', () => {
        let vacationList = browser.findElements(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.ITEMS.vacation_list)).then(elements => {
            currentVacation = elements[elements.length - 1];
            expect(elements.length).toBeGreaterThan(0);
        });
    });
    it('"data-href" must contain link', () => {
        currentVacation.getAttribute('data-href').then(text => {
            updateRequestLink = text;
            expect(updateRequestLink.length).toBeGreaterThan(0)
        });
    });
    it('click to dropdown on "Action" column', () => {
        dropdownButton = currentVacation.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.BUTTONS.vacation_action_dropdown))
        expect(dropdownButton.isDisplayed()).toBeTruthy();
        browser.actions().click(dropdownButton).perform();
    });
    it('click "update request" on dropdown actions', () => {
        updateRequestButton = currentVacation.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.BUTTONS.dropdown_update_request));
        expect(updateRequestButton.isDisplayed()).toBeTruthy();
        browser.actions().click(updateRequestButton).perform();
    });
    it('should redirect to "update request" form', () => {
        updateRequestLink = updateRequestLink.replace('index', 'update')
        expect(browser.getCurrentUrl()).toEqual(CONSTANTS.URL + updateRequestLink)
    });
    describe('check "update request" form', () => {
        it('"Employee" must be "Vitali Haradkou"', () => {
            let currentUser = browser.findElement(PROTRACTOR.by.xpath(CONSTANTS.X_PATHS.update_form_user_name));
            expect(currentUser.getText()).toEqual('Vitali Haradkou')
        });
        it('"Type" field must be "Leave w/o pay"', () => {
            let vacationType = browser.findElement(PROTRACTOR.by.xpath(CONSTANTS.X_PATHS.update_form_user_name));
            expect(vacationType.getText()).toEqual('Leave w/o pay');
        });
    });
    it('should click on "Update request" button', () => {
        let updateButton = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.BUTTONS.update_request));
        expect(updateButton.isDisplayed()).toBeTruthy();
        browser.actions().click(updateButton).perform();
    })
});