@slow @regression @smoke
Feature: Fix Ticket

  Scenario: Add service, remove Cash instead of Credit and adjust tip
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8573"
    Then I should see the employee "Evelyn" in the employee list

    When I select the "Evelyn" employee
    Then I should see the "Ticket View" screen
    Then I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "21"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$21.00" visible

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

    When I wait for the page fully loaded
    And I search for "21"
    Then I should see the first ticket with total "$21.00"

    When I select the first ticket with total "$21.00"
    Then I should see the service "Manicure" in my cart
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see the service "Acrylic removal" in my cart

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash   - $21.00"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

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

  Scenario: View service details
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9610"
    Then I should see the employee "Natalie" in the employee list

    When I select the "Natalie" employee
    Then I should see the "Ticket View" screen
    Then I should see the "Combo 1" service
    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Combo 1"
    Then I should see a popup dialog with title "Service: Combo 1 - $45.00"
    When I change the price to "49"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$49.00" visible

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
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the text "TOTAL TIP" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I wait for the page fully loaded
    And I search for "55.47"
    Then I should see the first ticket with total "$55.47"
    When I select the first ticket with total "$55.47"
    Then I should see the service "Combo 1" in my cart

    When I click on the title "DETAILS" in the ticket adjustment screen
    Then I should see the package item "Manicure" in my cart
    And I should see the detail "Tip (Non Cash)$2.87"
    And I should see the detail "Item Supply Fee($2.00)"
    And I should see multiple "Ticket Supply Fee($1.00)" details
    And I should see multiple "Comm Loyalty$0.00" details
    And I should see the detail "Package Amount$39.00"
    And I should see the detail "Commission$21.60"
    And I should see the package item "Pedicure" in my cart
    And I should see the detail "Tip (Non Cash)$2.13"
    And I should see the detail "Item Supply Fee($3.00)"
    And I should see the detail "Package Amount$29.00"
    And I should see the detail "Commission$15.00"

  Scenario: Create a ticket for today, add tip, apply discount item and apply discount ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I click on the "CREATE TICKET" button
    Then I should see a popup dialog containing the title "Create Ticket"

    When I click on the "Anna" text inside the content section of the opening dialog
    And I click on the "Save" button in the popup dialog
    Then I should see the text "NEW TICKET#" in the ticket adjustment screen
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see the service "Acrylic removal" in my cart
    And I should see the employee "Anna" in my cart

    When I click on the charge item "Tip" in the ticket adjustment screen
    Then I should see a popup dialog with title "Add Tip"
    When I enter the amount "10"
    And I click on the "OK" button in the popup dialog
    Then I should see the charge display "Tip$10.00"

    When I click on the charge item "Discount" in the ticket adjustment screen
    Then I should see a popup dialog with title "DISCOUNT TICKET"
    And I should see the "Owner Absorbs" option is checked
    When I select the discount "$5 Off"
    Then I should see the charge display "Discount($5.00)"

    When I select the service "Acrylic removal" in my cart
    Then I should see the check icon
    When I click on the action "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT ITEM"
    And I should see the "Owner Absorbs" option is checked
    When I select the discount "10% Off"
    Then I should see the "10% Off" discount in my cart

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the payment history "VISA (1234)" visible
    And I should see the payment price contain amount "+ $10.00"

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

  Scenario: Change price, remove payment and adjust tip for Gift type
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9055"
    Then I should see the employee "Addison" in the employee list

    When I select the "Addison" employee
    Then I should see the "Ticket View" screen
    Then I should see the "Gel removal" service
    When I add the "Gel removal" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Gel removal"
    Then I should see a popup dialog with title "Service: Gel removal - $40.00"
    When I change the price to "42"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$42.00" visible

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

    When I wait for the page fully loaded
    And I search for "42"
    Then I should see the first ticket with total "$42.00"
    When I select the first ticket with total "$42.00"
    Then I should see the service "Gel removal" in my cart

    When I select the service "Gel removal" in my cart
    Then I should see the check icon
    When I click on the action "PRICE" button
    Then I should see a popup dialog with title "CHANGE PRICE"
    When I enter the amount "20"
    And I click on the "OK" button in the popup dialog
    Then I should see the charge display "TOTAL$20.00"

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash   - $42.00"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "CHECK BALANCE" button
    And I click on the element with id "payment"
    Then I should see the payment history "Gift (1111)" visible

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

  Scenario: Void item, remove payment and add a new payment
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3412"
    Then I should see the employee "Olivia" in the employee list

    When I select the "Olivia" employee
    Then I should see the "Ticket View" screen
    Then I should see the "Gel removal" service
    When I add the "Gel removal" service to my cart
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "11"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$11.00" visible

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

    When I wait for the page fully loaded
    And I search for "51"
    Then I should see the first ticket with total "$51.00"
    When I select the first ticket with total "$51.00"
    Then I should see the service "Gel removal" in my cart
    And I should see the service "Manicure" in my cart

    When I select the service "Manicure" in my cart
    Then I should see the check icon
    When I click on the action "VOID ITEM" button
    Then I should see a popup dialog with title "VOID ITEM"
    When I select the reason "Mistake"
    And I click on the "OK" button in the popup dialog
    Then I should see the charge display "TOTAL$40.00"

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash   - $51.00"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the payment history "VISA (1234)" visible

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

  Scenario: Change tech and split tip
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8414"
    Then I should see the employee "Ava" in the employee list

    When I select the "Ava" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "22"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$22.00" visible

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I wait for the page fully loaded
    And I search for "35.9"
    Then I should see the first ticket with total "$35.90"
    When I select the first ticket with total "$35.90"
    Then I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart

    When I select the service "Manicure" in my cart
    Then I should see the check icon
    When I select the "TECHS" tab
    And I wait for the page fully loaded
    And I select the employee "Anna" in the ticket adjustment screen
    Then I should see the employee "Anna" in my cart
    And I should see the text "Please select a service to change the technician." in the ticket adjustment screen

    When I click on the action "SPLIT TIPS" button
    Then I should see a popup dialog with title "SPLIT TIPS"
    And I should see the employee "Anna" visible in the split tip screen
    And I should see the employee "Ava" visible in the split tip screen
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "$5.00" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button in the popup dialog

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

  Scenario: Void a sell Gift Card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5720"
    Then I should see the employee "Mackenzie" in the employee list
    When I select the "Mackenzie" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I add the "Acrylic removal" service to my cart
    And I click on the total price of "Acrylic removal"
    Then I should see a popup dialog with title "Service: Acrylic removal - $30.00"
    When I change the price to "26.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$26.70" visible

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "0503"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "0503" visible
    When I click on the "ADD ON" button in the popup dialog

    Then I should see my cart showing 2 item added
    And I should see the service "Gift card $50 (0503)" in my cart

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

    When I wait for the page fully loaded
    And I search for "76.7"
    Then I should see the first ticket with total "$76.70"
    When I select the first ticket with total "$76.70"
    Then I should see the service "Acrylic removal" in my cart
    And I should see the service "Gift card $50 (0503)" in my cart

    When I select the service "Gift card $50 (0503)" in my cart
    Then I should see the check icon
    When I click on the action "VOID ITEM" button
    And I select the reason "Mistake"
    And I click on the "OK" button in the popup dialog
    Then I should not see the service "Gift card $50 (0503)" in my cart
    And I should see the charge display "TOTAL$26.70"

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash   - $76.70"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I click on the element with id "payment"
    Then I should see the payment history "Cash" visible
    And I should see the payment history amount "$26.70" visible

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

    When I back to HOME page
    And I wait for the page fully loaded

    Given I am on the GIFT_CARD_BALANCE page
    When I enter the amount "0503"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see a popup dialog containing the title "ACTIVATE GIFT CARD"
    And I should see a popup dialog with content "Do you want to activate gift card #0503"

Scenario: Remove Tax and make new payment
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8888"
    Then I should see the employee "thanh" in the employee list

    When I select the "thanh" employee
    Then I should see the "Ticket View" screen
    When I select the "FULL SET & FILL IN" category
    And I add the "Taxable" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero


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

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I wait for the page fully loaded
    And I search for "16.96"
    Then I should see the first ticket with total "$16.96"
    When I select the first ticket with total "$16.96"
    Then I should see the service "Taxable" in my cart
    And I should see the tax amount non-zero
    When I remove the tax
    Then I should see the tax display "$0.00"

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash   - $16.96"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "CHECK BALANCE" button
    And I click on the element with id "payment"
    Then I should see the payment history "Gift (1111)" visible

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

Scenario: Add Tax and make new payment
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6993"
    Then I should see the employee "Jack" in the employee list
    When I select the "Jack" employee
    And I select the "FULL SET & FILL IN" category
    And I add the "Taxable" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I remove the tax
    Then I should see the tax display "$0.00"

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

    When I wait for the page fully loaded
    And I search for "16"
    Then I should see the first ticket with total "$16.00"
    When I select the first ticket with total "$16.00"
    Then I should see the service "Taxable" in my cart
    Then I should see the tax display "$0.00"
    When I add the tax
    Then I should see the tax amount non-zero

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash   - $16.00"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "CHECK BALANCE" button
    And I click on the element with id "payment"
    Then I should see the payment history "Gift (1111)" visible

    When I click on the adjust tip icon
    Then I should see a popup dialog with title "Adjust Tip "
    When I enter the amount "20"
    And I click on the "Add Tip" button in the popup dialog
    Then I should see the payment price contain amount "+ $20.00"

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

  Scenario: Add a customer to the ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8888"
    Then I should see the employee "thanh" in the employee list

    When I select the "thanh" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "50"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$50.00" visible

    When I wait for the page fully loaded

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

    When I wait for the page fully loaded
    And I search for "50"
    Then I should see the first ticket with total "$50.00"
    When I select the first ticket with total "$50.00"
    Then I should see the service "Manicure" in my cart
    When I add the phone number customer "9999999999"
    Then I should see a new customer "Tin" on ticket

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

