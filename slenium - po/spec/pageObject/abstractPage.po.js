const protractor = require('protractor');

module.exports = class BasicPage {
    constructor() { }

    /**
     * @description factory method
     */
    static createInstance() {
        return new BasicPage();
    }
    get title() {
        throw new Error(`basic page not implement this ${this.title} method`);
    }
    load() {
        throw new Error(`basic page not implement this ${this.load()} method`);
    }

}