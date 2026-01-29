@regression @slow @page
Feature: Cash In/Out

  Scenario: View the Cash In and Cash Out page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Cash In/Out" label in the menu list
    Then I should be redirected to CASH_IN_OUT page
    And I should see the "Cash In/Out" screen
