@regression @slow @page
Feature: Departments management

  Scenario: View the Departments management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Departments" label in the expanded list
    Then I should be redirected to DEPARTMENT page
    And I should see the "Departments" screen
