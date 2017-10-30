import { $, ElementFinder, browser } from "protractor";

export class HomePageObject {
    public addVacationButton: ElementFinder;

    constructor(

    ) {
        this.addVacationButton = $("div>a#addVac");
        // browser.getTitle().then(title => this.pageTitle = title)
    }
}
