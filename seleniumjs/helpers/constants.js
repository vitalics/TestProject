module.exports = {
    URL: 'http://vacation.epam.com',
    SLEEP_TIMEOUT: 5000,
    TITLE: 'VACATION - EPAM Vacation Tracking System',
    CSS_SELECTORS: {
        add_new_vacation_button: 'div>a#addVac',
        employee_input: 'input#employeeId',
        approver_text: 'button[data-id = "approverId"]>span.filter-option',
        leave_pay_type_text: 'button[data-id = "vacSubtype"]>span.filter-option',
        comment_text: 'textarea#comment',
        save_as_draft_button: 'button#draft',
        request_popup_message_successful:'div.main-content>span.message-block'
    }
}
