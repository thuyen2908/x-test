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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "11.5"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "47.00"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "24.57"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "12.36"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$12.36"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Angie" in the ticket

    When I click on the "Pay" button
    Then I should see the payment history "VISA (1234)$12.36" visible

    When I select the payment history "VISA (1234)$12.36"
    Then I should see a popup dialog with title "CONFIRM ADJUST TIP "
    When I click on the action button "Adjust Tip" of the opening dialog

    When I enter the amount "10"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "23.50"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "27.66"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "15.5"
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "16.48"
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
    When I clock in the timesheet with PIN "8546"
    Then I should see the employee "Fiona" in the employee list

    When I select the "Fiona" employee
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
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "25.75"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$25.75"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Fiona" in the ticket

    When I select the service "Manicure" in my cart
    And I select the "VOID ITEM" on the menu
    And I select the reason "Wrong Item"
    Then I should not see the service "Manicure" in my cart
    And I should see my cart showing 1 item added

    When I click on the "Pay" button
    Then I should see the payment history "VISA (1234)$25.75" visible

    When I select the payment history "VISA (1234)$25.75"
    Then I should see a popup dialog with title "CONFIRM ADJUST TIP "
    When I click on the action button "Adjust Tip" of the opening dialog
    And I click on the "VOID" button
    Then I should see a popup dialog with title "VISA  - $25.75"
    When I click on the "Remove" button in the popup dialog
    And  I select the "Credit" payment type
    And I fill the last 4 digits of card number "4321"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (4321)$8.24" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Update GC balance when selling an add-on gift card and then voiding the ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2463"
    Then I should see the employee "Isabella" in the employee list
    When I select the "Isabella" employee
    Then I should see the "Ticket View" screen

    When I add the "Acrylic removal" service to my cart
    And I select the service "Acrylic removal" in my cart
    And I change price amount "27.5"

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "1703"
    And I click on the "OK" button in the popup dialog
    And I click on the "ADD ON" button in the popup dialog
    Then I should see my cart showing 2 item added
    And I should see the service "Gift card $50 (1703)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I click on refresh
    And I wait for the page fully loaded
    Then I should see the toast message "Ticket data refreshed successfully" visible

    When I wait for the page fully loaded
    And I search for "77.5"
    And I wait for the page fully loaded
    And I reopen ticket with payment amount "$77.5"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Isabella" in the ticket

    When I click on the "Void Ticket" button
    And I select the reason "Mistake"
    Then I should see a popup dialog with title "Confirm Void"
    When I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

    Given I am on the GIFT_CARD_BALANCE page
    When I enter the amount "1703"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded

    Then I should see the first date is today in the gift card detail list
    Then I should see the first type "ActivateAddOn" in the gift card detail list
    And I should see the first amount "$50.00" in the gift card detail list

  Scenario: Cannot find gift card after selling a new gift card and then voiding the item Gift Card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6727"
    Then I should see the employee "Alexis" in the employee list
    When I select the "Alexis" employee
    Then I should see the "Ticket View" screen

    When I add the "Acrylic removal" service to my cart
    Then I should see the service "Acrylic removal" in my cart

    When I select the service "Acrylic removal" in my cart
    And I change price amount "25.7"

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "1903"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 2 item added
    And I should see the service "Gift card $50 (1903)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully" visible
    When I wait for the page fully loaded
    And I search for "75.7"
    And I wait for the page fully loaded

    When I reopen ticket with payment amount "$75.7"
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Alexis" in the ticket

    When I select the service "Gift card $50 (1903)" in my cart
    And I select the "VOID ITEM" on the menu
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    Then I should see the payment history "Cash $75.70 " visible

    When I select the payment history "Cash $75.70 "
    Then I should see a popup dialog with title "Cash  - $75.70"
    When I click on the "Remove" button in the popup dialog

    When I select the "Cash" payment type
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the selected "SERVICE" tab on the Home page

    Given I am on the GIFT_CARD_BALANCE page
    When I wait for the page fully loaded
    Then I should see the text "Gift Card / Loyalty Balance" visible

    When I enter the amount "1903"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    And I wait for the page fully loaded
    Then I should see a popup dialog containing the title "ACTIVATE GIFT CARD"
    And I should see a popup dialog with content "Do you want to activate gift card #1903"

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

  Scenario: View the loyalty point on Receipt
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2883"
    Then I should see the employee "Gabriella" in the employee list
    When I select the "Gabriella" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    And I change price amount "35.5"

    # Add discount item - Open Discount ($3) Owner absorb
    When I select the service "Manicure" in my cart
    And I select the "DISCOUNT ITEM" on the menu
    Then I should see the "Original Price (Owner)" option is active

    When I select the discount "Open Discount"
    Then I should see the "Amount" discount type is active
    When I enter the amount "3"
    And I click on the "OK" button
    Then I should see the "Open Discount (Original Price)" discount in my cart
    And I should see discount "($3.00)" in my cart

    # Add discount ticket - Open discount (10%) Technician absorb
    When I click on the adding "Discount" button
    Then I should see the "Original Price (Owner)" option is active

    When I select the discount absorb type "Discounted Price (Technician)"
    Then I should see the "Discounted Price (Technician)" option is active

    When I select the discount "Open Discount"
    And I select the "Percent" discount type
    Then I should see the "Percent" discount type is active

    When I enter the amount "10"
    And I click on the "OK" button
    Then I should see the discount ticket detail "Open Discount 10% (Discounted Price)($3.25)" in my cart
    And I should see "Discount ($3.25)" in my cart

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Loyalty"

    When I click on the "Pay" button
    And I enter the amount "100"
    And I select the "Cash" payment type
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$70.75OK"
    When I click on the "OK" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "29.25"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$29.25"

    When I click on the first row for payment "$29.25"
    Then I should see the store logo on the receipt
    And I should see the business info "PINK SALON 1032 YONKERS AVE Yonkers Avenel, NJ 07001 (090) 123-4567" on the receipt

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
