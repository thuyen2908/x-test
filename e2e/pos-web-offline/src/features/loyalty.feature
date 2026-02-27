@slow @regression @smoke
Feature: Loyalty Balance

  Scenario: Search Loyalty Balance
    Given I am on the LOYALTY_BALANCE page
    Then I should see the text "Loyalty Phone Number:" visible

    When I enter the amount "9999999999"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the title contain "Tin" visible
    And I should see the text "ACTIVITY SUMMARY" visible
    And I should see the text "CURRENTLY VIEWING" visible
    And I should see the loyalty phone "(999) 999-9999" visible

    When I click on the "SEARCH ANOTHER" button
    And I enter the amount "8888888888"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the title contain "Bill" visible
    And I should see the loyalty phone "(888) 888-8888" visible

  Scenario: Adjust Loyalty balance
    Given I am on the LOYALTY_BALANCE page
    Then I should see the text "Loyalty Phone Number:" visible

    When I enter the amount "9999999999"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the title contain "Tin" visible
    And I should see the loyalty phone "(999) 999-9999" visible

    When I enter the amount "700"
    Then I should see the number "700" visible
    When I click on the "INCREASE" button
    Then I should see the first type "PosManualIssuance" in the loyal detail list

