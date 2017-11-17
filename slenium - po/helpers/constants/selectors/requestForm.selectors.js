module.exports = {
    CSS_SELECTORS: {
        INPUTS: {
            employee: 'input#employeeId'
        },
        TEXTAREA: {
            comment: 'textarea#comment',
        },
        BUTTONS: {
            save_as_draft: 'button#draft'
        },
        TEXTS: {
            approver: 'button[data-id = "approverId"]>span.filter-option',
            leave_pay_type: 'button[data-id = "vacSubtype"]>span.filter-option',
            user_name: 'li.user-menu.dropdown > div.user-menu > span.username'
        }
    }
}