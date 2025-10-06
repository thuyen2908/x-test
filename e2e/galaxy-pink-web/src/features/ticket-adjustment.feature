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

    When I click on the total price of "Manicure"
    And I change price amount "21"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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
    Then I should see the payment history "Cash" visible in payment tab
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
    When I select the "Credit" payment type on the payment ticket dialog
    And I fill the last 4 digits of card number "1234" on the payment ticket dialog
    And I click on the element with id "payment"
    Then I should see the payment history "VISA (1234)" visible in payment tab

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
    And I change price amount "49"

    When I select the service "Manicure" in my cart
    And I select the "Kelley" employee in the list item employee
    Then I should see the "Kelley" employee in my cart

    When I add tip amount "5"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$50.47 + $5.00" visible

    When I click on the "SPLIT TIP" button
    And I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I click on the "Create Ticket" button
    Then I should see a popup dialog containing the title "Create Ticket"

    When I click on the "Anna" text inside the content section of the opening dialog
    And I click on the "Save" button in the popup dialog
    Then I should see the text "NEW TICKET#" in the ticket adjustment screen
    And I should see the "Acrylic removal" service

    When I wait for the page fully loaded
    And I add the "Acrylic removal" service to my cart
    Then I should see the service "Acrylic removal" in my cart
    And I should see the employee "Anna" in my cart

    When I click on the charge item "Tip" in the ticket adjustment screen
    Then I should see a popup dialog with title "ADD TIP TICKET"
    When I enter the amount "10"
    And I click on the "OK" button in the add tip dialog
    Then I should see the charge display "Tip$10.00"

    When I click on the charge item "Discount" in the ticket adjustment screen
    Then I should see a popup dialog with title "DISCOUNT TICKET"
    And I should see the "Original Price (Owner)" option is active
    When I select the discount "$5 Off"
    Then I should see the charge display "Discount($5.00)"

    When I select the service "Acrylic removal" in my cart
    Then I should see the check icon
    When I click on the action "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT ITEM"
    And I should see the "Original Price (Owner)" option is active
    When I select the discount "10% Off"
    Then I should see the "10% Off" discount in my cart
    And I should see discount "($3.00)" in my cart

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I select the "Credit" payment type on the payment ticket dialog
    When I fill the last 4 digits of card number "1234" on the payment ticket dialog
    And I click on the element with id "payment"
    Then I should see the payment history "VISA (1234)" visible in payment tab
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
    When I change price amount "42"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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
    Then I should see the payment history "Cash" visible in payment tab
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
    When I select the "Gift" payment type on the payment ticket dialog
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "CHECK BALANCE" button
    And I click on the element with id "payment"
    Then I should see the payment history "Gift (1111)" visible in payment tab

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
    And I change price amount "11"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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
    Then I should see the payment history "Cash" visible in payment tab
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
    When I select the "Credit" payment type on the payment ticket dialog
    And I fill the last 4 digits of card number "1234" on the payment ticket dialog
    And I click on the element with id "payment"
    Then I should see the payment history "VISA (1234)" visible in payment tab

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
    And I change price amount "22"

    When I add tip amount "5"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$30.90 + $5.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the group "Nails"
    Then I should see the "Anna" employee in my cart
    And I should see the text "Please select a service to change the technician." in the ticket adjustment screen

    When I click on the action "SPLIT TIPS" button
    Then I should see a popup dialog with title "SPLIT TIPS"
    And I should see the employee "Anna" visible in the split tip dialog
    And I should see the employee "Ava" visible in the split tip dialog
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "$5.00" visible in the split tip dialog

    When I click on the "PERCENT SPLIT" button in the split tip dialog
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
    And I change price amount "26.7"

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $50" service
    When I add the "Gift card $50" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $50.00"

    When I enter the amount "0403"
    And I click on the "OK" button in the popup dialog
    Then I should see my cart showing 2 item added
    And I should see the service "Gift card $50 (0403)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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
    And I should see the service "Gift card $50 (0403)" in my cart

    When I select the service "Gift card $50 (0403)" in my cart
    Then I should see the check icon
    When I click on the action "VOID ITEM" button
    Then I should not see the service "Gift card $50 (0403)" in my cart
    And I should see the charge display "TOTAL$26.70"

    When I select the "PAYMENT" tab
    Then I should see the payment history "Cash" visible in payment tab
    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "VOID PAYMENT"
    And  I should see a popup dialog with content "Cash - $76.70"
    When I click on the "Remove" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Void Payment"
    When I click on the "Yes, void it" button in the popup dialog

    When I click on the "PAY" button
    Then I should see a popup dialog with title "PAYMENT TICKET"
    When I click on the element with id "payment"
    Then I should see the payment history "Cash" visible in payment tab
    And I should see the payment history amount "$26.70" visible

    When I click on the "CONFIRM" button
    Then I should see a popup dialog with title "Confirm Save Ticket"
    When I click on the "SAVE" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the text "Please select a ticket." in the ticket adjustment screen

    When I back to HOME page
    And I wait for the page fully loaded
    And I navigate to "Balance" on the navigation bar
    And I wait for the page fully loaded
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card / Loyalty Balance" visible

    When I enter the amount "0403"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the toast message "Cannot find this Gift Card." visible
