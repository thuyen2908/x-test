@regression @smoke @skip
Feature: Gift Card Balance

  Scenario: View Gift Card balance
    Given I am on the HOME page
    When I click on the "Balance" label in the header
    And I select the "Gift Card" label
    And I enter password of "Owner" employee
    Then I should be redirected to GIFT-CARD page
    And I should see the name "Gift Card" visible

    When I input Gift Card "1234"
    And I click on the "Search" button
    Then I should see the text "Details" visible
    And I should see the text "Activity Summary" visible
    And I should see the text "Currently Viewing" visible






