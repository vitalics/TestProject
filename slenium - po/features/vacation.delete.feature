Feature: delete vacation from draft

    @VacationScenario
    Scenario: User delete vacation from draft
        Given: I am on "my vacations" page
        When I am delete vacation
        Then I should see list without test created vacation
