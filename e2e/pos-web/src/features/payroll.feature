@regression @smoke
Feature: Payroll

  Scenario: Verify employee-specific Single Payroll information loads correctly
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen

    When I wait for the page fully loaded
    And I select the employee "Anna"
    And I wait for the page fully loaded
    Then I should see the technician name "Anna"
    And I should see the payroll type "Commission"

