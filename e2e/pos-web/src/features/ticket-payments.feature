@slow @regression @smoke
Feature: Ticket Payments

  Scenario: Display the correct page title and nav tabs
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Ticket Payments" label in the menu list
    Then I should be redirected to TICKET_PAYMENTS page
    And I should see the "Ticket Payments" screen
    And I should see the Ticket table displayed correctly
    And I should see both date pickers default to today
    And I should see no results for invalid search

    When I select the "SERVICES/PRODUCTS" tab
    Then I should see the first Services-Products table displayed correctly

    When I select the "PAYMENTS" tab
    Then I should see the fist Payments table displayed correctly

    When I select the "TRANSACTIONS" tab
    Then I should see the "Batch Out" button visible in the payroll
    Then I should see the Transaction table displayed correctly

    When I select the "BATCH HISTORY" tab
    Then I should see the Batch history table displayed correctly







