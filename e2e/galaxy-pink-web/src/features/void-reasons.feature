@regression @smoke
Feature: Void reasons management

  Scenario: User can view the list of void reasons
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Void Reasons" label in the expanded list
    Then I should be redirected to VOID_REASONS page
    And I should see the "Void Reasons" screen
