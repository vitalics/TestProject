import { $, ElementFinder, ElementArrayFinder, $$ } from "protractor";

export class VacationFormPageObject {

    constructor(
        public commentArea: ElementFinder,
        public leaveTypeButton: ElementFinder,
    ) {
        this.commentArea = $("textarea#comment");
        this.leaveTypeButton = $('button#vacSubtype');
    }
}
