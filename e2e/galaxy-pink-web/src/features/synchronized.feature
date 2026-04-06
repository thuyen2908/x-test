@regression @slow @page
Feature: Synchronize

  Scenario: Display the synchronized popup
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Synchronize" label in the menu list
    Then I should see a popup dialog with title "Synchronize"
