@regression @smoke @slow
Feature: Turn details

  Scenario: Verify the specific queue loads correctly employees
    Given I am on the HOME page
    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Nails" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the employees displayed correctly in turn details

  Scenario: Turn update or remove when creating or voiding a ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5727"
    And I click on the queue "HAIR" button
    Then I should see the employee "Jessica" in the employee list
    And I should see the turn number for "Jessica" is 0.0

    When I select the "Jessica" employee
    Then I should see the "Ticket View" screen
    And I should see the "Gel X" service
    When I add the "Gel X" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I click on the queue "Hair" button
    Then I should see the employee "Jessica" in the employee list
    And I should see the turn number for "Jessica" is 1.0

    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the Round 1 for "Jessica"
    And I should see the Turn 1.00 for "Jessica"
    And I should see the Auto Turn 1.00 for "Jessica"

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "27"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$27.00"

    When I click on the last row for payment "$27.00" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Jessica" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

    When I click on the queue "HAIR" button
    Then I should see the employee "Jessica" in the employee list
    And I should see the turn number for "Jessica" is 0.0

    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the Round 0 for "Jessica"
    And I should see the Turn 0.00 for "Jessica"

  Scenario: Turn update when changing technician
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3818"
    Then I should see the employee "Avery" in the employee list
    And I should see the turn number for "Avery" is 0.0

    When I select the "Avery" employee
    Then I should see the "Ticket View" screen
    And I should see the "FULL SET & FILL IN" category
    When I select the "FULL SET & FILL IN" category
    And I add the "Fill gel" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page
    When I wait for the page fully loaded
    Then I should see the employee "Avery" in the employee list
    And I should see the turn number for "Avery" is 1.0

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "23.5"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$23.50"

    When I click on the last row for payment "$23.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Avery" in the ticket

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Fill gel" service in the dialog
    And I select the "Zoey" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Zoey" employee in my cart

    When I click on the "PAY" button
    And I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page
    And I should see the turn number for "Avery" is 0.0
    And I should see the turn number for "Zoey" is 1.0

    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page
    And I should see the text "Technicians" visible
    And I should see the text "All" visible
    And I should see the Round 1 for "Zoey"
    And I should see the Turn 1.00 for "Zoey"
    And I should see the Auto Turn 1.00 for "Zoey"
    And I should see the Round 0 for "Avery"
    And I should see the Turn 0.00 for "Avery"

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "23.5"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$23.50"

    When I click on the last row for payment "$23.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Zoey" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

  Scenario: Manually adding decrease a turn reorders the employee queue
    Given I am on the HOME page
    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "All" visible
    When I click on the "Nails" button
    Then I should see the Round 0 for "Leah"
    And I should see the Turn 0.00 for "Leah"

    When I double click on the first turn detail for "Leah"
    Then I should see a popup dialog containing the title "Nails"
    And I should see a popup dialog with content "Technician: Leah"

    When I enter the amount "1"
    And I click on the "DECREASE" button in the popup dialog

    When I wait for the page fully loaded
    Then I should see the Auto Turn -1.00 for "Leah"

    When I back to HOME page
    Then I should see the employee "Leah" listed first in the employee list

    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "All" visible
    When I click on the "Nails" button
    Then I should see the Round 1 for "Leah"
    And I should see the Turn -1.00 for "Leah"

    When I double click on the first turn detail for "Leah"
    Then I should see a popup dialog containing the title "Nails"
    When I click on the "DELETE TURN" button in the popup dialog

    When I wait for the page fully loaded
    Then I should see the Turn 0.00 for "Leah"
    And I should see the Round 0 for "Leah"

  Scenario: Manually adding increase a turn reorders the employee queue
    Given I am on the HOME page
    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "All" visible
    When I click on the "Nails" button
    Then I should see the Round 0 for "Amelia"
    And I should see the Turn 0.00 for "Amelia"

    When I double click on the first turn detail for "Amelia"
    Then I should see a popup dialog containing the title "Nails"
    And I should see a popup dialog with content "Technician: Amelia"

    When I enter the amount "20"
    And I click on the "INCREASE" button in the popup dialog

    When I wait for the page fully loaded
    Then I should see the Auto Turn 20.00 for "Amelia"

    When I back to HOME page
    Then I should see the employee "Amelia" listed last in the employee list

    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "All" visible
    When I click on the "Nails" button
    Then I should see the Round 1 for "Amelia"
    And I should see the Turn 20.00 for "Amelia"

    When I double click on the first turn detail for "Amelia"
    Then I should see a popup dialog containing the title "Nails"
    When I click on the "DELETE TURN" button in the popup dialog

    When I wait for the page fully loaded
    Then I should see the Turn 0.00 for "Amelia"
    And I should see the Round 0 for "Amelia"
