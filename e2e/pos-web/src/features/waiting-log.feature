@regression @smoke @slow @Logging
Feature: Waiting log

  Scenario: User can view the waiting log page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Logging" label in the menu list
    And I select the "Waiting Log" label in the expanded list
    Then I should be redirected to WAIT_LOG page
    And I should see the "Waiting List Log" screen
