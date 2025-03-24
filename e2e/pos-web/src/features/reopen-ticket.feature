@slow @regression @smoke
Feature: Reopen tickets

  Scenario: Reopen ticket to change tech for service package
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9860"
    Then I should see the employee "Ethan" in the employee list

    When I select the "Ethan" employee
    Then I should see the "Ticket View" screen
    And I should see the "Combo 1" service

    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added

    When I add the "Bill" customer
    Then I should see a new customer "Bill" on ticket

    When I click on the "Pay" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Bill"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Bill"

    When I click on the last row for customer "Bill" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Ethan" in the ticket

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Anna" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Anna" employee in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page


