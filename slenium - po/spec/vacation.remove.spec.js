const CONSTANTS = require('../helpers/constants/index.js');
const MYVACS = require('../helpers/constants/pages/myVacation.page.js');
const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;

// page objects
const vacations = require('./pageObject/vacation.vacationsPage.po.js');
const requestFormUpdatePage = require('./pageObject/vacation.requestFormUpdate.po.js');

browser.waitForAngularEnabled(false);


describe('remove vacation', () => {
    let myVacations = vacations.createInstance();

    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    })
    it('should crete instance of page object', () => {
        expect(myVacations).toBeDefined();
    });

    it('load site', () => {
        myVacations.load();
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('vacation list should be non empty', () => {
        myVacations.vacationList.then(elements => {
            expect(elements.length).toBeGreaterThan(0);
        });
    });
    it('click to dropdown "Action" column', () => {
        expect(myVacations.dropdown.isDisplayed()).toBeTruthy();
        myVacations.dropdown.click();
    })
    it('click "Delete request" on dropdown actions', () => {
        expect(myVacations.dropdownDeleteButton.isDisplayed()).toBeTruthy();
        myVacations.dropdownDeleteButton.click();
    });
    it('should see "Request successfully deleted" message', () => {
        expect(myVacations.alertMessage.getText()).toEqual('Request successfully deleted')
    });
});
