@slow @regression @smoke
Feature: Reopen tickets

  Scenario: Reopen ticket then close ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2429"
    Then I should see the employee "Chloe" in the employee list

    When I select the "Chloe" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "11.5"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$11.50" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    And I wait for the page fully loaded
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I search for "11.5"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$11.50"

    When I click on the first row for payment "$11.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Chloe" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to change tech for service package
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9860"
    Then I should see the employee "Ethan" in the employee list

    When I select the "Ethan" employee
    Then I should see the "Ticket View" screen
    And I should see the "Combo 1" service

    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Combo 1"
    Then I should see a popup dialog with title "Service: Combo 1 - $45.00"
    When I change the price to "47"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$47.00" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "47"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$47.00"

    When I click on the first row for payment "$47.00" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Ethan" in the ticket

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

  Scenario: Reopen ticket to change technician and split tip
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6373"
    Then I should see the employee "Mia" in the employee list

    When I select the "Mia" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "11"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$11.00" visible

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "24.95"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$24.95"

    When I click on the first row for payment "$24.95" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Mia" in the ticket

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Anna" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Anna" employee in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the "SPLIT TIP" button
    Then I should see the employee "Mia" visible in the split tip screen
    And I should see the employee "Anna" visible in the split tip screen
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to adjust tip for Credit Card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3957"
    Then I should see the employee "Angie" in the employee list

    When I select the "Angie" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "12"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$12.00" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "12.6"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$12.60"

    When I click on the first row for payment "$12.60" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Angie" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the payment history "VISA (1234)" visible

    When I click on the adjust tip icon
    Then I should see a popup dialog with title "Adjust Tip "
    When I enter the amount "10"
    And I click on the "Add Tip" button in the popup dialog
    Then I should see the payment price contain amount "+ $10.00"

    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to remove payment Cash and instead of Credit
    Given I am on the HOME page
    When I clock in the timesheet with PIN "4683"
    Then I should see the employee "Samantha" in the employee list

    When I select the "Samantha" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "23.5"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$23.50" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "23.5"
    And I wait for the page fully loaded
    Then I should see the first ticket of Cash payment "$23.50"

    When I click on the first row for payment "$23.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Samantha" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    Then I should see the payment history "Cash" visible

    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "Cash  - $23.50"
    When I click on the "Remove" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to change split tip Percent to Equal
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2174"
    Then I should see the employee "Daniel" in the employee list

    When I select the "Daniel" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "14"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$14.00" visible

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Kelley" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Kelley" employee in my cart

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the employee "Daniel" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "28.10"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$28.10"

    When I click on the first row for payment "$28.10" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Daniel" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    Then I should see the payment history "VISA (1234)" visible

    When I click on the "SPLIT TIP" button
    And I click on the "EQUAL SPLIT" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to add service and make payment Credit
    Given I am on the HOME page
    When I clock in the timesheet with PIN "7139"
    Then I should see the employee "Julia" in the employee list

    When I select the "Julia" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "15.5"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$15.50" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "15.5"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$15.50"

    When I click on the first row for payment "$15.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Julia" in the ticket

    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to void ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5971"
    Then I should see the employee "Daisy" in the employee list

    When I select the "Daisy" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "16"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$16.00" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "16.8"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$16.80"

    When I click on the first row for payment "$16.80" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Daisy" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

  Scenario: Reopen ticket to void item, remove and make new payment
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8573"
    Then I should see the employee "Evelyn" in the employee list

    When I select the "Evelyn" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "17"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$17.00" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "26.25"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$26.25"

    When I click on the first row for payment "$26.25" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Evelyn" in the ticket

    When I click on the item "VOID ITEM" button
    Then I should see a popup dialog with title "VOID MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the reason "Wrong Item"
    And I click on the "Void Items" button in the dialog
    Then I should not see the service "Manicure" in my cart
    And I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the payment history "VISA (1234)" visible

    When I click on the more menu for payment history of "VISA (1234)"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VISA  - $26.25"
    When I click on the "Remove" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "4321"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Sell a new Gift Card then void ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2463"
    Then I should see the employee "Isabella" in the employee list
    When I select the "Isabella" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I add the "Acrylic removal" service to my cart
    And I click on the total price of "Acrylic removal"
    Then I should see a popup dialog with title "Service: Acrylic removal - $30.00"
    When I change the price to "27.5"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$27.50" visible

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "1703"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the service "Gift card $50 (1703)" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "77.5"
    And I wait for the page fully loaded
    Then I should see the first ticket of Cash payment "$77.50"

    When I click on the first row for payment "$77.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Isabella" in the ticket

    When I void the current open ticket with no reason
    And I wait for the page fully loaded
    Then I should be redirected to HOME page

    When I navigate to "Appointment" on the navigation bar
    And I navigate to "Balance" on the navigation bar
    And I navigate to "Gift Card" on the navigation bar
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card" visible

    When I enter the amount "1703"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see a popup dialog containing the title "ACTIVATE GIFT CARD"
    And I should see a popup dialog with content "Do you want to activate gift card #1703"

  Scenario: Sell a new Gift Card then void item Gift Card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6727"
    Then I should see the employee "Alexis" in the employee list
    When I select the "Alexis" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I add the "Acrylic removal" service to my cart
    And I click on the total price of "Acrylic removal"
    Then I should see a popup dialog with title "Service: Acrylic removal - $30.00"
    When I change the price to "25.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$25.70" visible

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "0203"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 2 item added
    And I should see the service "Gift card $50 (0203)" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "75.7"
    And I wait for the page fully loaded
    Then I should see the first ticket of Cash payment "$75.70"

    When I click on the first row for payment "$75.70" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Alexis" in the ticket

    When I click on the item "VOID ITEM" button
    Then I should see a popup dialog with title "VOID MULTIPLE"
    When I select the "Gift card $50 (0203)" service in the dialog
    And I click on the "Void Items" button in the dialog
    Then I should see my cart showing 1 item added

    When I wait for the page fully loaded
    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "Cash  - $75.70"
    When I click on the "Remove" button in the popup dialog
    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    And I wait for the page fully loaded
    Then I should be redirected to HOME page

    When I navigate to "Appointment" on the navigation bar
    And I navigate to "Balance" on the navigation bar
    And I navigate to "Gift Card" on the navigation bar
    And I wait for the page fully loaded
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card" visible

    When I enter the amount "0203"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see a popup dialog containing the title "ACTIVATE GIFT CARD"
    And I should see a popup dialog with content "Do you want to activate gift card #0203"

  @skip
  Scenario: Remove loyalty balance when voiding ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "7217"
    Then I should see the employee "Charlotte" in the employee list
    When I select the "Charlotte" employee
    Then I should see the "Ticket View" screen
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see my cart showing 1 item added

    When I add the "Jimmy" customer
    Then I should see a new customer "Jimmy" on ticket

    When I click on the "PAY" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Jimmy"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Jimmy"

    When I click on the last row for customer "Jimmy" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Charlotte" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

    When I navigate to "Balance" on the navigation bar
    And I select the "Loyalty" option
    Then I should be redirected to LOYALTY_BALANCE page
    And I should see the text "Loyalty Phone Number:" visible

    When I enter the amount "0909090909"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the title contain "Jimmy" visible
    And I should see the text "No rows" visible

  Scenario: View the loyalty point on Receipt
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2883"
    Then I should see the employee "Gabriella" in the employee list
    When I select the "Gabriella" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "35.5"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$35.50" visible

    When I click on the adding "Discount" button
    Then I should see a popup dialog with title "Discount Ticket"
    And I should see the "Owner Absorbs" option is checked

    When I select the discount "Open Discount"
    Then I should see the discount type "Percent" visible
    When I enter the discount percent "10"
    And I click on the "Add" button in the popup dialog
    Then I should see the discount ticket non-zero

    When I click on the item "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT MULTIPLE"
    When I select the "Manicure" service in the dialog
    Then I should see the "Owner Absorbs" option is checked

    When I select the discount "Open Discount"
    And I select the type "Amount" option
    Then I should see the discount type "Amount" visible
    When I enter the discount amount "3"
    And I click on the "Add Value" button in the popup dialog
    And I click on the "Apply" button in the popup dialog
    Then I should see the "Open Discount" discount in my cart
    And I should see the "Owner Absorbs" absorption type in my cart
    And I should see discount "$3.00" in my cart

    When I click on the Select customer
    And I click on the "CLICK HERE TO ADD CUSTOMER" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Loyalty"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Loyalty" on ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I enter the amount "100"
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$70.75OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Refresh data ticket successfully." visible
    When I wait for the page fully loaded
    And I search for "29.25"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$29.25"

    When I click on the first row for payment "$29.25" to expand details
    Then I should see the store logo on the receipt
    And I should see the business info "BLANC NAILS 1032 YONKERS AVE Yonkers, NY 10704 (707) 707-1122" on the receipt

    Then I should see the date is today on the receipt
    And I should see the customer name "Loyalty" on the receipt
    And I should see the point "58 = $0.58" on the receipt

    Then I should see the service quantity "1" on the receipt
    And I should see the service name "Manicure" on the receipt
    And I should see the technician name "Gabriella" on the receipt
    And I should see the service price "$35.50" on the receipt
    And I should see the discount item name "Open Discount" on the receipt
    And I should see the discount item amount "($3.00)" on the receipt

    Then I should see the discount ticket name "Open Discount" on the receipt
    And I should see the discount ticket amount "($3.25)" on the receipt
    And I should see the TIP amount "$0.00" on the receipt
    And I should see the SUBTOTAL "$29.25" on the receipt
    And I should see the TAX "$0.00" on the receipt
    And I should see the TOTAL "$29.25" on the receipt

    Then I should see the CHANGE amount "$70.75" on the receipt

    Then I should see the payment label "PAYMENT DETAILS" on the receipt
    And I should see the payment method "Cash - $100.00" on the receipt
    And I should see the cash payment amount "$29.25" on the receipt

    Then I should see the message "Come back again soon..." on the receipt
    And I should see the message "Thank you <3" on the receipt

    Then I should see the tip guide "10% TIP = $2.92" on the receipt
    And I should see the tip guide "15% TIP = $4.39" on the receipt
    And I should see the tip guide "20% TIP = $5.85" on the receipt

    Then I should see the QR code on the receipt
