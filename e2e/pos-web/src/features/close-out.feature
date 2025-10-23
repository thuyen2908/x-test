@regression @smoke @slow
Feature: Close Out report

  Scenario: View the Close Out page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Close Out" label in the menu list
    Then I should be redirected to CLOSE_OUT page
    And I should see the "Close Out" screen
