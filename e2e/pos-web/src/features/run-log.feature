@regression @slow @page
Feature: Run Log

  Scenario: User can view the run log page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Logging" label in the menu list
    And I select the "Run Log" label in the expanded list
    Then I should be redirected to RUN_LOG page
    And I should see the "Run Logs" screen
