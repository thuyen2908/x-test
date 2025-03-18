@slow @regression @smoke
Feature: Gift Card Balance

  Scenario: Search Gift Card
    Given I am on the GIFT_CARD_BALANCE page
    Then I should see the text "Gift Card" visible

    When I enter the amount "1234"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the gift number "1234" visible

    When I click on the "SEARCH ANOTHER" button
    And I enter the amount "4321"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "DETAILS" visible
    And I should see the text "ACTIVITY SUMMARY" visible
    And I should see the text "CURRENTLY VIEWING" visible
    And I should see the gift number "4321" visible

  Scenario: Adjust Gift Card balance
    Given I am on the GIFT_CARD_BALANCE page
    Then I should see the text "Gift Card" visible

    When I enter the amount "1234"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "DETAILS" visible
    And I should see the text "ACTIVITY SUMMARY" visible
    And I should see the text "CURRENTLY VIEWING" visible
    And I should see the gift number "1234" visible

    When I enter the amount "5"
    Then I should see the number "5.00" visible
    When I click on the "INCREASE" button
    Then I should see the first type "PosManualAdjust" in the gift card detail list

