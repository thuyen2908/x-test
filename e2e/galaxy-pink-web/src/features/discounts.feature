@regression @smoke
Feature: Discounts management

  Scenario: View the Discounts management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Discounts" label in the expanded list
    Then I should be redirected to DISCOUNT page
    And I should see the "Discounts" screen
