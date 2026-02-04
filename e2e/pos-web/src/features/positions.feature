@regression @slow @page
Feature: Positions management

  Scenario: View the Positions management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Positions" label in the expanded list
    Then I should be redirected to POSITIONS page
    And I should see the "Positions" screen
