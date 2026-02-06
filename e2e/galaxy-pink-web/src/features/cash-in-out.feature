@regression @slow @page
Feature: Cash In/Out

  Scenario: View the Cash In and Cash Out page
    Given I am on the HOME page
    When I click on the functions
    And I select the "Cash In/Out" on the Daily Task
    And I wait for the page fully loaded
    Then I should be redirected to CASH_IN_OUT page
    And I should see the "Cash In/Out" screen
