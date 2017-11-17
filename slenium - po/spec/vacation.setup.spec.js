const CONSTANTS = require('../helpers/constants/index.js');
const PROTRACTOR = require('protractor');
// page objects
const vacationHomePage = require('./pageObject/vacation.home.po.js');
const requestFormCreatePage = require('./pageObject/vacation.requestFormCreate.po.js');
const vacationsPage = require('./pageObject/vacation.vacationsPage.po.js');


const browser = PROTRACTOR.browser;

browser.waitForAngularEnabled(false);

describe('Set up vacation.', () => {
    let mainPage = vacationHomePage.createInstance();

    beforeEach(() => {
        browser.sleep(CONSTANTS.SLEEP_TIMEOUT);
    });
    it('home page object should be defined.', () => {
        expect(mainPage).toBeDefined();
    });
    it('should load site.', () => {
        mainPage.load();
        expect(mainPage.title).toEqual(CONSTANTS.TITLE)
    });
    it('click "add vacation" button.', () => {
        expect(mainPage.addVacButton.isDisplayed()).toBeTruthy();
        mainPage.addVacButton.click();
    });
    it('should locate on request form.', () => {
        expect(browser.getCurrentUrl()).toContain('/vacations')
    });

    describe('Request form.', () => {
        let requestPage = requestFormCreatePage.createInstance();

        it('request form page object should be defined.', () => {
            expect(requestPage).toBeDefined();
        });

        describe('Check default form fields on "Student" position.', () => {

            it('"Employee" filed must be "Vitali Haradkou".', () => {
                expect(requestPage.employee.getAttribute('value')).toEqual('Vitali Haradkou')
            });
            it('"Approver" field should be "Kanstantsin Ausiannikau".', () => {
                expect(requestPage.approver.getText()).toEqual('Kanstantsin Ausiannikau')
            });
            it('"Leave w/o pay type" field must be "General leave".', () => {
                expect(requestPage.leavePayType.getText()).toEqual('General leave');
            });
            it('"Comment" filed should be empty.', () => {
                expect(requestPage.comment.getText()).toEqual('');
            });
        });

        describe('Fill vacation request form fields.', () => {

            it('"Comment" field.', () => {
                let commentText = 'some comment';
                requestPage.commentText = commentText;
                let fakePage = new requestFormCreatePage();
                expect(fakePage.commentText).toEqual(commentText);
            });
        });

        it('send request to draft.', () => {
            expect(requestPage.draftButton.isDisplayed()).toBeTruthy();
            requestPage.draftButton.click();
        });
        it('should redirect my vac page.', () => {
            expect(browser.getCurrentUrl()).toContain('/vacations');
        });

        describe('Vacations page.', () => {
            let myVacations = vacationsPage.createInstance();
            it('Should see "Request successfully saved" alert.', () => {
                expect(myVacations.alertMessage.getText()).toEqual('Request successfully saved');
            });
            it('vacation list is not empty.', () => {
                let vacationList = myVacations.vacationList.then(elems => {
                    expect(elems.length).toBeGreaterThan(0);
                });
            });
        });
    });
});
