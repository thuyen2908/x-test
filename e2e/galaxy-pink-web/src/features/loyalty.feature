@slow @regression @smoke
Feature: Loyalty Balance

  Scenario: Search Loyalty and adjust balance
    Given I am on the HOME page
    When I navigate to "Balance" on the navigation bar
    Then I should see the "Gift Card / Loyalty Balance" screen

    When I click on the "LOYALTY" button
    Then I should see the text "FIRST VISIT" visible
    And I should see the text "LAST VISIT" visible
    And I should see the text "VALUE" visible
    And I should see the text "LAST USED POINTS" visible
    And I should see the text "BALANCE" visible

    When I enter the amount "9999999999"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    And I click on the queue "+$/PTS" button
    Then I should see a popup dialog with title "Enter Point"

    When I enter the amount "1000"
    And I click on the "OK" button in the popup dialog
    Then I should see a second popup dialog with title "Enter Reason"
    When I click on the "OK" button in the dialog
    And I wait for the page fully loaded
    Then I should see the first type "PosManualIssuance" in the loyal detail list

