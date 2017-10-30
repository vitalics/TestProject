import { $, $$, ElementFinder, ElementArrayFinder } from "protractor";

export class VacationPageObject {

    constructor(
        public vacationList: ElementArrayFinder,
        public lastVacation: ElementFinder,
        public deleteAlert: ElementFinder
    ) {
        this.vacationList = $$("table.vts-table>tbody tr");
        this.lastVacation = this.vacationList.last();
        this.deleteAlert = $("div.vts-message.info>div.main-content");
    }
}
