@regression @slow @page
Feature: Menu Items management

  Scenario: View the Menu Items management page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Items" label in the expanded list
    Then I should be redirected to PRODUCTS page
    And I should see the "Menu Items" screen
