@regression @slow @page
Feature: Menu Categories management

  Scenario: View the Menu Categories management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Categories" label in the expanded list
    Then I should be redirected to CATEGORIES page
    And I should see the "Menu Categories" screen
