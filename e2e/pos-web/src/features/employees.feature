@regression @slow @page
Feature: Employee management

  Scenario: View the Employees management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Employees" label in the expanded list
    Then I should be redirected to EMPLOYEES page
    And I should see the "Employees" screen

