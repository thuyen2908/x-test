@regression @slow @page
Feature: Synchronize

  Scenario: Synchronize
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Synchronize" label in the menu list
    Then I should see a popup dialog containing the title "Synchronize"
    When I click on the action button "Sync" of the opening dialog
    Then I should see a popup dialog containing the title "Synchronize"
    And I should be redirected to HOME page