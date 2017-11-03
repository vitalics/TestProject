const CONSTANTS = require('./constants.js');
const PROTRACTOR = require('protractor');

const browser = PROTRACTOR.browser;
export class DateFormat {
    /**
     * 
     * @param {string} selector
     * @return {object}
     */
    getVacs(selector) {
        let vacs = {};
        let datas;
        browser.findElement(PROTRACTOR.by.css(selector)).getText().then(text => dates = text)

        let vacStart = dates.split('—')[0];

        let vacEnd = dates.split('—')[0];
        vacs.push({
            vacStart: new Date(vacStart),
            vacEnd: new Date(vacEnd)
        })
        return vacs;
    }

}

