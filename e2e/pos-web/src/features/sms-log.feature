@regression @smoke @slow @Logging
Feature: SMS Log

  Scenario: User can view the SMS log page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Logging" label in the menu list
    And I select the "SMS Log" label in the expanded list
    Then I should be redirected to SMS_LOG page
    And I should see the "SMS Logs" screen
