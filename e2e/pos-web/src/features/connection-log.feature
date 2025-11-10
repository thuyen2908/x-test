@regression @smoke @slow @Logging
Feature: Connection Log

  Scenario: User can view the connection log page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Logging" label in the menu list
    And I select the "Connection Log" label in the expanded list
    Then I should be redirected to CONNECTION_LOG page
    And I should see the "Connection Logs" screen
