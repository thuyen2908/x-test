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

  Scenario: View service details
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9610"
    Then I should see the employee "Natalie" in the employee list

    When I select the "Natalie" employee
    Then I should see the "Ticket View" screen
    Then I should see the "Combo 1" service
    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added

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
    Then I should see the "Ticket Adjustment" label in the expanded list

    When I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I select the first ticket with total "$55.09"
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

  Scenario: Create a ticket for today, add tip, discount item and discount ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    Then I should see the "Ticket Adjustment" label in the expanded list

    When I select the "Ticket Adjustment" label in the expanded list
    Then I should be redirected to TICKET_ADJUSTMENT page
    And I should see the "Ticket Adjustment" screen
    And I should see the text "TICKET#" visible

    When I click on the "Create Ticket" button
    Then I should see a popup dialog containing the title "Create Ticket"

    When I click on the "Anna" text inside the content section of the opening dialog
    And I click on the "Save" button in the popup dialog
    Then I should see the text "NEW TICKET#" in the ticket adjustment screen
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see the service "Acrylic removal" in my cart
    And I should see the employee "Anna" in my cart
    And I should see the tax display "$1.80"

    When I click on the charge item "Tip" in the ticket adjustment screen
    Then I should see a popup dialog with title "Add Tip"
    When I enter the amount "10"
    And I click on the "OK" button in the popup dialog
    Then I should see the charge display "Tip$10.00"

    When I click on the charge item "Discount" in the ticket adjustment screen
    Then I should see a popup dialog with title "Add Discount Ticket"
    And I should see the "Owner Absorbs" option is checked
    When I select the discount "$5 Off"
    And I click on the "Add" button in the popup dialog
    Then I should see the charge display "Discount($5.00)"

    When I select the service "Acrylic removal" in my cart
    Then I should see the check icon
    When I click on the action "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT ITEM"
    And I should see the "Owner Absorbs" option is checked
    When I select the discount "10% Off"
    And I click on the "OK" button in the popup dialog
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
