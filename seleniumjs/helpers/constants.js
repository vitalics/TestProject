module.exports = {
    URL: 'http://vacation.epam.com',
    SLEEP_TIMEOUT: 5000,
    TITLE: 'VACATION - EPAM Vacation Tracking System',
    CSS_SELECTORS: {
        BUTTONS: {
            add_new_vacation: 'div>a#addVac',
            save_as_draft: 'button#draft',
            vacation_action_dropdown: '.dropdown.actions>a'
        },
        ITEMS: {
            vacation_list: 'table tr[data-type="POV"]',
        },
        INPUTS: {
            employee: 'input#employeeId',
        },
        TEXTS: {
            approver: 'button[data-id = "approverId"]>span.filter-option',
            leave_pay_type: 'button[data-id = "vacSubtype"]>span.filter-option',
            comment: 'textarea#comment',
            request_popup_message_successful: 'div.main-content>span.message-block',
            vac_interval: 'td.startDate',
            user_name: 'li.user-menu.dropdown .name',
        },
    }
}
