@slow @regression @smoke
Feature: Gift Card Balance

  Scenario: Search Gift Card and adjust balance
    Given I am on the HOME page
    When I navigate to "Balance" on the navigation bar
    Then I should see the "Gift Card / Loyalty Balance" screen

    When I enter the amount "1234"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "ACTIVATED DATE" visible
    And I should see the text "ORIGINAL VALUE" visible
    And I should see the text "LAST REDEEMED DATE" visible
    And I should see the text "LAST REDEEMED AMT" visible
    And I should see the text "BALANCE" visible

    When I click on the queue "+$/PTS" button
    Then I should see a popup dialog with title "Enter Amount"

    When I enter the amount "50"
    And I click on the "OK" button in the popup dialog
    Then I should see a second popup dialog with title "Enter Reason"
    When I click on the "OK" button in the dialog
    And I wait for the page fully loaded
    Then I should see the first type "PosManualAdjust" in the gift card detail list

