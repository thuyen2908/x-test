@regression @slow @page
Feature: Paid Online Gift Card

  Scenario: View the Paid Online Gift Card page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Paid Online Gift Card" label in the expanded list
    Then I should be redirected to PAID_ONLINE_GIFT_CARD page
    And I should see the "Paid Online Gift Card" screen
