@slow @regression @smoke
Feature: Ticket adjustment

  Scenario: Add service, remove Cash instead of Credit and adjust tip
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8573"
    Then I should see the employee "Evelyn" in the employee list

    When I select the "Evelyn" employee
    Then I should see the "Ticket View" screen
    Then I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I select the first ticket with total "$6.36"
    Then I should see the service "Manicure" in my cart
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see the service "Acrylic removal" in my cart

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "Cash  - $6.36"
    When I click on the "Remove" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the payment history "VISA (1234)" visible

    When I click on the adjust tip icon
    Then I should see a popup dialog with title "Adjust Tip "
    When I enter the amount "10"
    And I click on the "Add Tip" button in the popup dialog
    Then I should see the payment price contain amount "+ $10.00"

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

