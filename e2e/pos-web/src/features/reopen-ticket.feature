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

    When I add the "Riley" customer
    Then I should see a new customer "Riley" on ticket

    When I click on the "PAY" button
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

    When I search for "Riley"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Riley"

    When I click on the last row for customer "Riley" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Chloe" in the ticket

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

    When I add the "Bill" customer
    Then I should see a new customer "Bill" on ticket

    When I click on the "PAY" button
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

    When I add the "Zoe" customer
    Then I should see a new customer "Zoe" on ticket

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "5" tip in my cart

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Zoe"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Zoe"

    When I click on the last row for customer "Zoe" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Mia" in the ticket

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

    When I add the "Lila" customer
    Then I should see a new customer "Lila" on ticket

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Lila"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Lila"

    When I click on the last row for customer "Lila" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Angie" in the ticket

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

    When I add the "Ron" customer
    Then I should see a new customer "Ron" on ticket

    When I click on the "PAY" button
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

    When I search for "Ron"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Ron"

    When I click on the last row for customer "Ron" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Samantha" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    Then I should see the payment history "Cash" visible

    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "Cash  - $6.36"
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
    And I should see the tax amount non-zero

    When I add the "Ron" customer
    Then I should see a new customer "Ron" on ticket

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Kelley" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Kelley" employee in my cart

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "5" tip in my cart

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

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

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Ron"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Ron"

    When I click on the last row for customer "Ron" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Daniel" in the ticket

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

    When I add the "Layla" customer
    Then I should see a new customer "Layla" on ticket

    When I click on the "PAY" button
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

    When I search for "Layla"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Layla"

    When I click on the last row for customer "Layla" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Julia" in the ticket

    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog
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

    When I add the "Ella" customer
    Then I should see a new customer "Ella" on ticket

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Ella"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Ella"

    When I click on the last row for customer "Ella" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Daisy" in the ticket

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

    When I add the "Harper" customer
    Then I should see a new customer "Harper" on ticket

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I click on the "Tickets" label in the header
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "Harper"
    And I wait for the page fully loaded
    Then I should see the last ticket of customer "Harper"

    When I click on the last row for customer "Harper" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Evelyn" in the ticket

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
    Then I should see a popup dialog with title "VISA  - $15.58"
    When I click on the "Remove" button in the popup dialog

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Sell a new Gift Card then void ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2463"
    Then I should see the employee "Isabella" in the employee list
    When I select the "Isabella" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "5678"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the service "Gift card $50 (5678)" in my cart
    And I should see the tax amount non-zero

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

    When I search for "53"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$53.00"

    When I click on the last row for payment "$53.00" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    Then I should see the "Ticket View" screen
    And I should see the employee "Isabella" in the ticket

    When I void the current open ticket with no reason
    Then I should be redirected to HOME page

    When I navigate to "Balance" on the navigation bar
    And I select the "Gift Card" option
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card" visible

    When I enter the amount "5678"
    And I click on the "SEARCH" button
    Then I should see a popup dialog containing the title "ACTIVATE GIFT CARD"
    And I should see a popup dialog with content "Do you want to activate gift card #5678"

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
    Then I should see the "Ticket View" screen
    And I should see the employee "Charlotte" in the ticket

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
