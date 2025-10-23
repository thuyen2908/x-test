@regression @smoke @slow
Feature: Customers management

  Scenario: View the Customers management page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Customers" label in the menu list
    Then I should be redirected to CUSTOMERS page
    And I should see the "Customers" screen
