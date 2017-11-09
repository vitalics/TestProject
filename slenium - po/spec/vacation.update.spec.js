const CONSTANTS = require('../helpers/constants/index.js');
const MYVACS = require('../helpers/constants/pages/myVacation.page.js');
const UPDATEVAC = require('../helpers/constants/pages/updateVacation.page.js');
const URLHELPER = require('../helpers/link.helper.js');

const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;
let urlHelper = new URLHELPER();

browser.waitForAngularEnabled(false);

let updateRequestLink = '';
let updateRequestButton;
let currentVacation;
let dropdownButton;

describe('Update vacation.', () => {
    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    });
    it('Should load my vacations', () => {
        browser.get(CONSTANTS.URL + '/vacations/type/me');
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('Vacation list should be non empty', () => {
        let vacationList = browser.findElements(PROTRACTOR.by.css(MYVACS.CSS_SELECTORS.ITEMS.vacation_list)).then(elements => {
            currentVacation = elements[elements.length - 1];
            expect(elements.length).toBeGreaterThan(0);
        });
    });
    it('Get "data-href" link', () => {
        currentVacation.getAttribute('data-href').then(text => {
            updateRequestLink = text;
            expect(updateRequestLink.length).toBeGreaterThan(0);
        });
    });
    it('"data-herf" must be a link', () => {
        let link = CONSTANTS.URL + updateRequestLink;
        expect(link).toBeTruthy(urlHelper.urlIsValid(link));
    });
    it('click to dropdown on "Action" column', () => {
        dropdownButton = currentVacation.findElement(PROTRACTOR.by.css(MYVACS.CSS_SELECTORS.BUTTONS.vacation_action_dropdown))
        expect(dropdownButton.isDisplayed()).toBeTruthy();
        browser.actions().click(dropdownButton).perform();
    });
    it('click "update request" on dropdown actions', () => {
        updateRequestButton = currentVacation.findElement(PROTRACTOR.by.css(MYVACS.CSS_SELECTORS.BUTTONS.dropdown_update_request));
        expect(updateRequestButton.isDisplayed()).toBeTruthy();
        browser.actions().click(updateRequestButton).perform();
    });
    it('should redirect to "update request" form', () => {
        updateRequestLink = updateRequestLink.replace('index', 'update')
        expect(browser.getCurrentUrl()).toBeTruthy(urlHelper.urlIsValid(CONSTANTS.URL + updateRequestLink));
        // expect(browser.getCurrentUrl()).toEqual(CONSTANTS.URL + updateRequestLink);
    });
    describe('check "update request" form', () => {
        it('"Employee" must be "Vitali Haradkou"', () => {
            let currentUser = browser.findElement(PROTRACTOR.by.xpath(UPDATEVAC.X_PATHS.update_form_user_name));
            expect(currentUser.getText()).toEqual('Vitali Haradkou')
        });
        it('"Type" field must be "Leave w/o pay"', () => {
            let vacationType = browser.findElement(PROTRACTOR.by.xpath(UPDATEVAC.X_PATHS.pay_type));
            expect(vacationType.getText()).toEqual('Leave w/o pay');
        });
    });
    it('should click on "Update request" button', () => {
        let updateButton = browser.findElement(PROTRACTOR.by.css(UPDATEVAC.CSS_SELECTORS.BUTTONS.update_request));
        expect(updateButton.isDisplayed()).toBeTruthy();
        browser.actions().click(updateButton).perform();
    });
});
