const CONSTANTS = require('../helpers/constants/index.js');
const URLHELPER = require('../helpers/link.helper.js');

const PROTRACTOR = require('protractor');

// page objects
const vacations = require('./pageObject/vacation.vacationsPage.po.js');
const requestFormUpdatePage = require('./pageObject/vacation.requestFormUpdate.po.js');


const browser = PROTRACTOR.browser;
let urlHelper = new URLHELPER();

browser.waitForAngularEnabled(false);

let updateRequestLink = '';

describe('Update vacation.', () => {
    let vacationPage = vacations.createInstance();

    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    });

    it('vacation page must be defined.', () => {
        expect(vacationPage).toBeDefined();
    });
    it('should load my vacations.', () => {
        vacationPage.load();
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('vacation list should be non empty.', () => {
        let vacationList = vacationPage.vacationList.then(elements => {
            expect(elements.length).toBeGreaterThan(0);
        });
    });
    it('get "data-href" link.', () => {
        vacationPage.lastVacation.getAttribute('data-href').then(text => {
            updateRequestLink = text;
            expect(text.length).toBeGreaterThan(0);
        });
    });
    it('"data-herf" must be a link.', () => {
        expect(CONSTANTS.URL + updateRequestLink).toBeTruthy(urlHelper.urlIsValid(CONSTANTS.URL + updateRequestLink));
    });
    it('click to dropdown on "Action" column.', () => {
        vacationPage.dropdown.click();
        expect(vacationPage.dropdown.isDisplayed()).toBeTruthy();
    });
    it('click "update request" on dropdown actions.', () => {
        browser.actions().click(vacationPage.dropdownUpdateButton).perform();
    });
    it('should redirect to "update request" form.', () => {
        expect(browser.getCurrentUrl()).toBeTruthy(urlHelper.urlIsValid(CONSTANTS.URL + updateRequestLink));
    });

    describe('Update form page.', () => {
        let updateFormPage = requestFormUpdatePage.createInstance();

        it('update form page object should be defined.', () => {
            expect(updateFormPage).toBeDefined();
        });

        describe('Check "update request" form.', () => {

            it('"Employee" must be "Vitali Haradkou".', () => {
                expect(updateFormPage.employee.getText()).toEqual('Vitali Haradkou')
            });

            it('"Type" field must be "Leave w/o pay".', () => {
                expect(updateFormPage.leavePayType.getText()).toEqual('Leave w/o pay');
            });
        });

        it('should click on "Update request" button.', () => {
            expect(updateFormPage.updateButton.isDisplayed()).toBeTruthy();
            updateFormPage.updateButton.click();
        });
    });
});
