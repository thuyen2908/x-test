@regression @smoke @slow
Feature: Turn details

  Scenario: Verify the specific queue loads correctly employees
    Given I am on the HOME page
    When I select the "TURN DETAILS" tab
    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Nails" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the employees displayed correctly in turn details

  Scenario: Turn update when voiding a ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5727"
    And I click on the queue "HAIR" button
    Then I should see the employee "Jessica" in the employee list
    And I should see Employee "Jessica" with "C = 0.0" in the employee list
    #And I should see the turn number for "Jessica" is 0.0

    When I select the "Jessica" employee
    Then I should see the "Ticket View" screen
    And I should see the "Gel X" service
    When I add the "Gel X" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Gel X" in my cart
    And I change price amount "27.11"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I click on the queue "Hair" button
    Then I should see the employee "Jessica" in the employee list
    And I should see Employee "Jessica" with "C = 1.0" in the employee list
    # And I should see the turn number for "Jessica" is 1.0

    When I select the "TURN DETAILS" tab

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the Round 1 for "Jessica"
    And I should see the Turn 1.00 for "Jessica"
    And I should see the Auto Turn 1.00 for "Jessica"

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded

    When I search for "27.11"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "27.11"

    When I reopen to void ticket with payment amount "$27.11"
    Then I should see the selected "SERVICE" tab on the Home page
    And I should not see the employee "Jessica" in the ticket list

    When I click on the queue "HAIR" button
    Then I should see the employee "Jessica" in the employee list
    And I should see Employee "Jessica" with "C = 0.0" in the employee list
    # And I should see the turn number for "Jessica" is 0.0

    When I select the "TURN DETAILS" tab
    And I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the Round 0 for "Jessica"
    And I should see the Turn 0.00 for "Jessica"

  Scenario: Turn update when changing technician
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3818"
    Then I should see the employee "Avery" in the employee list
    And I should see Employee "Avery" with "C = 0.0" in the employee list
    # And I should see the turn number for "Avery" is 0.0

    When I select the "Avery" employee
    Then I should see the "Ticket View" screen
    And I should see the "FULL SET & FILL IN" category
    When I select the "FULL SET & FILL IN" category
    And I add the "Fill gel" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Fill gel" in my cart
    And I change price amount "23.58"

    When I pay the exact amount by "Cash"
    And I wait for the page fully loaded
    Then I should see the selected "SERVICE" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the employee "Avery" in the employee list
    And I should see Employee "Avery" with "C = 1.0" in the employee list
    # And I should see the turn number for "Avery" is 1.0

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded

    When I search for "23.58"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$23.58"

    When I reopen ticket with payment amount "$23.58"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Avery" in the ticket

    When I select the service "Fill gel" in my cart
    And I select the "Zoey" employee in the list item employee
    Then I should see the "Zoey" employee in my cart

    When I click on the "Pay" button
    And I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page
    And I should see Employee "Avery" with "C = 0.0" in the employee list
    And I should see Employee "Zoey" with "C = 1.0" in the employee list
    # And I should see the turn number for "Avery" is 0.0
    # And I should see the turn number for "Zoey" is 1.0

    When I select the "TURN DETAILS" tab
    Then I should see the text "Technicians" visible
    And I should see the text "All" visible
    And I should see the Round 1 for "Zoey"
    And I should see the Turn 1.00 for "Zoey"
    And I should see the Auto Turn 1.00 for "Zoey"
    And I should see the Round 0 for "Avery"
    And I should see the Turn 0.00 for "Avery"

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded

    When I search for "23.58"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$23.58"

    When I reopen to void ticket with payment amount "$23.58"
    Then I should see the selected "SERVICE" tab on the Home page
    And I should not see the employee "Zoey" in the ticket list

  Scenario: Manually adding decrease a turn reorders the employee queue
    Given I am on the HOME page
    When I select the "TURN DETAILS" tab
    And I wait for the page fully loaded
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

    When I select the "SERVICE" tab
    Then I should see the employee "Leah" listed first in the employee list

    When I select the "TURN DETAILS" tab
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
    When I select the "TURN DETAILS" tab
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

    When I select the "SERVICE" tab
    When I back to HOME page
    Then I should see the employee "Amelia" listed last in the employee list

    When I select the "TURN DETAILS" tab
    And I wait for the page fully loaded
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

 Scenario: Adjust turn - Add Late Turn, Remove Late Turn
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0210"
    Then I should see the employee "Late Turn" in the employee list
    When I hold the "Late Turn" employee two seconds
    Then I should see the "TURN" Adjustment

    When I click on the "Add Late Turn" in turn adjustment
    Then I should see a popup dialog with title "Adjust Turn"
    When I enter the amount "20"
    And I click on the "INCREASE" button in the popup dialog
    And I wait for the page fully loaded
    And I waiting 1s
    Then I should see Employee "Late Turn" with "C = 20.0" in the employee list

    When I hold the "Late Turn" employee two seconds
    Then I should see the "TURN" Adjustment
    When I click on the "Remove Late Turn" in turn adjustment
    And I wait for the page fully loaded
    And I waiting 1s
    Then I should see Employee "Late Turn" with "C = 0.0" in the employee list

 Scenario: Adjust turn - Add Go Again, Remove Go Again
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0466"
    Then I should see the employee "Go Again" in the employee list
    When I hold the "Go Again" employee two seconds
    Then I should see the "TURN" Adjustment

    When I click on the "Add Go Again" in turn adjustment
    And I wait for the page fully loaded
    And I waiting 1s
    And I waiting 1s
    Then I should see Employee "Go Again" with "C = 0.0" in the employee list

    When I select the "Go Again" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Manicure" in my cart
    And I change price amount "21.26"
    Then I should see the total price "$21.26" visible

    When I pay the exact amount by "Cash"
    And I wait for the page fully loaded
    Then I should see the selected "SERVICE" tab on the Home page
    And I should see Employee "Go Again" with "C = 0.0 " in the employee list

    When I hold the "Go Again" employee two seconds
    Then I should see the "TURN" Adjustment
    When I click on the "Remove Go Again" in turn adjustment
    Then I should see Employee "Go Again" with "C = 1.0" in the employee list

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded

    When I search for "21.26"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$21.26"

    When I reopen to void ticket with payment amount "$21.26"
    Then I should see the selected "SERVICE" tab on the Home page
    And I should not see the employee "Go Again" in the ticket list
    And I should see Employee "Go Again" with "C = 0.0" in the employee list

    When I select the "CLOSED TICKET" tab
    And I click on refresh
    And I wait for the page fully loaded
    Then I should see the toast message "Ticket data refreshed successfully." visible

    When I search for "21.26"
    And I wait for the page fully loaded
    When I click on the first row for payment "$21.26"
    And I click the Delete ticket button
    Then I should see a popup dialog with title 'Confirm Delete'

    When I click on the "confirm" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "deleted successfully" visible

 Scenario: Adjust turn - Move, Remove Move
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5781"
    Then I should see the employee "Move" in the employee list

    When I hold the "Move" employee two seconds
    Then I should see the "TURN" Adjustment

    When I click on the "Move" in turn adjustment
    Then I should see a popup dialog with title "Enter New Position"
    When I enter the amount Delete button
    When I enter the amount Delete button
    And I click on the "CONFIRM" button in the popup dialog
    And I wait for the page fully loaded
    And I waiting 1s
    And I waiting 1s
    Then I should see the position employee "Move" is "#1"

    When I hold the "Move *" employee two seconds
    Then I should see the "TURN" Adjustment
    When I click on the "Remove Move" in turn adjustment
    And I wait for the page fully loaded
    Then I should see the employee "Move" is not at position 1
