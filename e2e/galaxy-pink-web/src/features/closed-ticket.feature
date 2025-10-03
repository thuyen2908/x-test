@slow @regression @smoke
Feature: Closed Ticket

  Scenario: Reopen ticket then close ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2429"
    Then I should see the employee "Chloe" in the employee list

    When I select the "Chloe" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Manicure" in my cart
    And I change price amount "11.5"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "11.5"
    And I wait for the page fully loaded

    And I reopen ticket with payment amount "$11.50"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Chloe" in the ticket

    When I click on the "Pay" button
    Then I should see the payment history "Cash $11.50" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Reopen ticket to change tech for service package
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9860"
    Then I should see the employee "Ethan" in the employee list

    When I select the "Ethan" employee
    Then I should see the "Ticket View" screen
    And I should see the "Combo 1" service

    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Combo 1" in my cart
    And I change price amount "47"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "47"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$47.00"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Ethan" in the ticket

    When I select the service "Manicure" in my cart
    And I select the "Anna" employee in the list item employee
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the group "Nails"
    Then I should see the "Anna" employee in my cart

    When I click on the "Pay" button
    Then I should see the payment history "Cash $47.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Manicure" in my cart
    And I change price amount "11"

    When I add tip amount "5"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu

    Then I should see the payment history "VISA (1234)$19.57 + $5.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "24.57"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$24.57"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Mia" in the ticket

    When I select the service "Manicure" in my cart
    And I select the "Anna" employee in the list item employee
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the group "Nails"
    Then I should see the "Anna" employee in my cart

    When I click on the "Pay" button
    When I click on the "SPLIT TIP" button
    Then I should see the employee "Mia" visible in the split tip screen
    And I should see the employee "Anna" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I change price amount "12"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$12.36" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "12.36"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$12.36"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Angie" in the ticket

    When I click on the "Pay" button
    Then I should see the payment history "VISA (1234)$12.36" visible

    When I select the payment history "VISA (1234)$12.36"
    And I enter the amount "10"
    And I click on the "OK" button
    Then I should see the payment history "VISA (1234)$12.36 + $10.00" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I change price amount "23.5"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "23.5"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$23.50"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Samantha" in the ticket

    When I click on the "Pay" button
    Then I should see the payment history "Cash $23.50" visible

    When I select the payment history "Cash $23.50"
    Then I should see a popup dialog with title "Cash  - $23.50"
    When I click on the "Remove" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$24.20" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I change price amount "14"

    When I select the service "Manicure" in my cart
    And I select the "Kelley" employee in the list item employee
    Then I should see the "Kelley" employee in my cart

    When I add tip amount "5"

    When I click on the "Pay" button
    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$22.66 + $5.00" visible

    When I click on the "SPLIT TIP" button
    Then I should see the employee "Daniel" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "27.66"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$27.66"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Daniel" in the ticket

    When I click on the "Pay" button
    And I click on the "SPLIT TIP" button
    And I click on the "EQUAL SPLIT" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I change price amount "15.5"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "15.5"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$15.5"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Julia" in the ticket

    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "Pay" button
    Then I should see the payment history "Cash $15.50" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$8.24" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I change price amount "16"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$16.48" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "16.48"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$16.48"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Daisy" in the ticket

    When I click on the "Void Ticket" button
    And I select the reason "System Test"
    Then I should see a popup dialog with title "Confirm Void"
    When I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I change price amount "17"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$25.75" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "25.75"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$25.75"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Evelyn" in the ticket

    When I select the service "Manicure" in my cart
    And I select the "VOID ITEM" on the menu
    And I select the reason "Wrong Item"
    Then I should not see the service "Manicure" in my cart
    And I should see my cart showing 1 item added

    When I click on the "Pay" button
    Then I should see the payment history "VISA (1234)$25.75" visible

    When I select the payment history "VISA (1234)$25.75"
    And I click on the "VOID" button
    Then I should see a popup dialog with title "VISA  - $25.75"
    When I click on the "Remove" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "4321"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$8.24" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Sell a new Gift Card then void ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2463"
    Then I should see the employee "Isabella" in the employee list
    When I select the "Isabella" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I add the "Acrylic removal" service to my cart
    And I select the service "Acrylic removal" in my cart
    And I change price amount "27.5"

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "1703"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the service "Gift card $50 (1703)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I refresh and search amount "77.5"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$77.5"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Isabella" in the ticket

    When I click on the "Void Ticket" button
    And I select the reason "Mistake"
    Then I should see a popup dialog with title "Confirm Void"
    When I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

    When I wait for the page fully loaded
    And I navigate to "Balance" on the navigation bar
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card / Loyalty Balance" visible

    When I enter the amount "1703"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the toast message "Cannot find this Gift Card." visible

  @skip
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

    When I enter the amount "0103"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 2 item added
    And I should see the service "Gift card $50 (0103)" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "75.7"
    And I wait for the page fully loaded
    Then I should see the last ticket of Cash payment "$75.70"

    When I click on the last row for payment "$75.70" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Alexis" in the ticket

    When I click on the item "VOID ITEM" button
    Then I should see a popup dialog with title "VOID MULTIPLE"
    When I select the "Gift card $50 (0103)" service in the dialog
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
    And I click on the "Balance" label in the header
    And I select the "Gift Card" option
    And I wait for the page fully loaded
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card" visible

    When I enter the amount "0103"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the toast message "Cannot find this Gift Card." visible

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

    When I click on the "Tickets" label in the header
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

  @skip
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

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Loyalty"

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "35.5"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$35.50"

    When I click on the last row for payment "$35.50" to expand details
    Then I should see the store logo on the receipt
    And I should see the business info "BLANC NAILS 1032 YONKERS AVE Yonkers, NY 10704 (707) 707-1122" on the receipt

    Then I should see the date is today on the receipt
    And I should see the customer name "Loyalty" on the receipt
    And I should see the point "70 = $0.70" on the receipt

    Then I should see the service quantity "1" on the receipt
    And I should see the service name "Manicure" on the receipt
    And I should see the technician name "Gabriella" on the receipt
    And I should see the service price "$35.50" on the receipt

    Then I should see the TIP amount "$0.00" on the receipt
    And I should see the SUBTOTAL "$35.50" on the receipt
    And I should see the TAX "$0.00" on the receipt
    And I should see the TOTAL "$35.50" on the receipt

    Then I should see the CHANGE amount "$0.00" on the receipt

    Then I should see the payment label "PAYMENT DETAILS" on the receipt
    And I should see the payment method "Cash - $35.50" on the receipt
    And I should see the cash payment amount "$35.50" on the receipt

    Then I should see the message "Come back again soon..." on the receipt
    And I should see the message "Thank you <3" on the receipt

    Then I should see the tip guide "10% TIP = $3.55" on the receipt
    And I should see the tip guide "15% TIP = $5.32" on the receipt
    And I should see the tip guide "20% TIP = $7.10" on the receipt

    Then I should see the QR code on the receipt
