Feature: Set up vacation to draft

    @VacationScenario
    Scenario: User add vacation to draft
        Given I am on home page
        When I am click add new vacation
        Then open vacation form
        And fill form
        When I am save to draft
