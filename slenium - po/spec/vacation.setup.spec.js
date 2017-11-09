const CONSTANTS = require('../helpers/constants/index.js');
const MAIN = require('../helpers/constants/pages/main.page.js');
const ADDVAC = require('../helpers/constants/pages/addVacation.page.js');
const MYVACS = require('../helpers/constants/pages/myVacation.page.js');
const PROTRACTOR = require('protractor');
// page objects
const vacationHomePage = require('./pageObject/vacation.home.po.js');
const requestFormCreatePage = require('./pageObject/vacation.requestFormCreate.po.js');
const vacations = require('./pageObject/vacation.vacationsPage.po.js');


const browser = PROTRACTOR.browser;

browser.waitForAngularEnabled(false);

describe('Set up vacation.', () => {
    let mainPage = vacationHomePage.createInstance();

    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    });

    it('should load site', () => {
        mainPage.load();
        expect(CONSTANTS.TITLE).toEqual(browser.getTitle())
    });

    it('Click "add vacation" button', () => {
        expect(mainPage.addVacButton.isDisplayed()).toBeTruthy();
        mainPage.addVacButton.click();
    });

    it('should locate on request form', () => {
        expect(browser.getCurrentUrl()).toContain('/vacations')
    });

    describe('Request form.', () => {
        let requestPage = requestFormCreatePage.createInstance();
        beforeEach(() => {
            expect(browser.getCurrentUrl()).toContain('vacations')
        });

        describe('Check default form fields on "Student" position.', () => {
            it('"Employee" filed must be "Vitali Haradkou"', () => {
                expect(requestPage.employee.getAttribute('value')).toEqual('Vitali Haradkou')
            });
            it('"Approver" field should be "Kanstantsin Ausiannikau"', () => {
                expect(requestPage.approver.getText()).toEqual('Kanstantsin Ausiannikau')
            });
            it('"Leave w/o pay type" field must be "General leave"', () => {
                expect(requestPage.leavePayType.getText()).toEqual('General leave');
            });
            it('"Comment" filed should be empty', () => {
                expect(requestPage.commentText).toEqual('');
            });
        });

        describe('Fill vacation request form fields.', () => {
            it('"Comment" field', () => {
                let commentText = 'some comment';
                requestPage.bindComment(commentText);
                expect(requestPage.comment.getText()).toEqual(commentText);
            });
        });
        it('Send request to draft', () => {
            expect(requestPage.draftButton.isDisplayed()).toBeTruthy();
            requestPage.draftButton.click();
        });
        it('Should redirect my vac page', () => {
            expect(browser.getCurrentUrl()).toContain('/vacations');
        });
        describe('vacations page', () => {
            let myVacations = vacations.createInstance();
            it('Should see "Request successfully saved" alert', () => {
                expect(myVacations.alertMessage.getText()).toEqual('Request successfully saved');
            });
            it('Vacation list is not empty', () => {
                let vacationList = myVacations.vacationList.then(elems => {
                    expect(elems.length).toBeGreaterThan(0);
                });
            });
        });
    });
});
