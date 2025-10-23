@regression @smoke @slow
Feature: Tax management

  Scenario: User can view the list of tax
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Tax" label in the expanded list
    Then I should be redirected to TAX page
    And I should see the "Tax" screen
