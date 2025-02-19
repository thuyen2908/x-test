@regression @smoke @skip
Feature: Loyalty

  Scenario: View Loyalty Balance
    Given I am on the HOME page
    When I click on the "Balance" label in the header
    And I select the "Loyalty" label
    And I enter password of "Owner" employee
    Then I should be redirected to LOYALTY page
    Then I should see the text "Loyalty Phone Number" visible

    When I input Loyalty "1111111111"
    And I click on the "Search" button
    Then I should see the text "Customer" visible
    And I should see the text "Activity Summary" visible
    And I should see the text "Currently Viewing" visible
