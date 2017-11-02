const CONSTANTS = require('../helpers/constants.js');
const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;

browser.waitForAngularEnabled(false);

let vacationList;

describe('remove vacation', () => {
    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    })
    it('load site', () => {
        browser.get(CONSTANTS.URL + '/epm-vts-web/vacations/type/me');
        expect(browser.getTitle()).toEqual(CONSTANTS.TITLE)
    });
    it('load vacations list', () => {
        vacationList = browser.findElements(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.vacation_list_items)).then(element => {
            expect(element.length).toBeGreaterThan(0);
        });
    });
    it('remove all vacation from draft', () => {
        let vacationListDropdown = browser.findElement(PROTRACTOR.by.css(CONSTANTS.CSS_SELECTORS.dropdown_link_button))
    });
});
