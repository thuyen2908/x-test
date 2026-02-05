@regression @slow @page
Feature: Online Gift Card Inventory

  Scenario: View the Online Gift Card Inventory page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Online Gift Card Inventory" label in the expanded list
    Then I should be redirected to ONLINE_GIFT_CARD_INVENTORY page
    And I should see the "Online Gift Card Inventory" screen
