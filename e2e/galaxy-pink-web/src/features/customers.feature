@regression @slow @page
Feature: Customers management

  Scenario: View the Customers management page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the functions
    And I select the "Customers" on the Daily Task
    When I wait for the page fully loaded
    Then I should be redirected to CUSTOMERS page
    And I should see the "Customers" screen
