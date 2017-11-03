module.exports = {
    URL: 'https://vacation.epam.com/epm-vts-web',
    SLEEP_TIMEOUT: 5000,
    TITLE: 'VACATION - EPAM Vacation Tracking System',
    CSS_SELECTORS: {
        BUTTONS: {
            add_new_vacation: 'div>a#addVac',
            save_as_draft: 'button#draft',
            vacation_action_dropdown: '.dropdown.actions>a',
            dropdown_update_request: '.dropdown-menu a[title="Update Request"]',
            dropdown_delete_request: '.dropdown-menu a[title="Delete Request"]',
            update_request: 'button#update'
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
    },
    X_PATHS: {
        // very bad selector
        update_form_user_name: '//div[@id="form-body"]/div[9]/div/div[contains(@class,"textbox")]',
        pay_type: '//*[@id="form-body"]/div[13]/div/div'
        // update_form_user_name:'//div[not(contains(@class,"hidden"))]//div[@class="textbox textbox-readonly" and text() = 'Vitali Haradkou'] '
    }
}
