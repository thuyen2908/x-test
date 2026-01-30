@regression @smoke @slow
Feature: Payroll

  Scenario: Verify employee-specific Single Payroll information loads correctly
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen
    And I should see both date pickers default to today
    And I should see the "Recalculation" button disable
    And I should see the "Save" button disable
    And I should see the print button "Print" visible

    When I wait for the page fully loaded
    And I search for "Anna"
    And I select the employee "Anna"
    And I wait for the page fully loaded
    Then I should see the technician name "Anna"
    And I should see the payroll type "Commission"

    When I select the type "Employee View"
    Then I should see the text "Technician Pay" visible
    And I should see the text "Daily Details" visible

  Scenario: Verify the Summary Payroll information loads correctly
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen

    When I click on the "SUMMARY PAYROLL" tab
    Then I should see the "Print" button visible in the payroll
    Then I should see the text "Technician Name" visible
    And I should see the text "Payroll Type" visible
    And I should see the text "Total Sales" visible

  Scenario: Verify employee-specific Payroll Details information loads correctly
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen

    When I wait for the page fully loaded
    And I search for "Anna"
    And I select the employee "Anna"
    And I wait for the page fully loaded
    And I click on the "PAYROLL DETAILS" tab
    Then I should see the text "Date" visible
    And I should see the text "Ticket#" visible
    And I should see the text "Item Name" visible
    And I should see the text "Item Price" visible

  Scenario: Verify employee-specific Timesheet information loads correctly
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen

    When I search for "Anna"
    And I select the employee "Anna"
    And I wait for the page fully loaded
    And I click on the "TIMESHEET" tab
    Then I should see the text "Date" visible
    And I should see the text "Hours" visible
    And I should see the text "Maintenance Fee" visible

  Scenario: Commission details in the Employee View are calculated correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6789"
    Then I should see the employee "Sydney" in the employee list

    When I select the "Sydney" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    And I select the "GIFT CARD" category
    And I add the "Shampoo" service to my cart
    And I add the "Gift card $100" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "2222"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "2222" visible
    When I click on the "ADD ON" button in the popup dialog
    Then I should see the service "Gift card $100 (2222)" in my cart
    And I should see my cart showing 3 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "55.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$55.70" visible

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "10" from the numpad
    Then I should see "$10.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the button with id "payment" visible

    When I enter the amount "50"
    And I click on the element with id "payment"
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen

    When I wait for the page fully loaded
    And I search for "Sydney"
    And I select the employee "Sydney"
    And I wait for the page fully loaded
    And I select the type "Employee View"
    Then I should see the Payroll Date default to today
    And I should see the detail "Technician Sydney" in the employee view
    And I should see the detail "Payroll Type Commission" in the employee view
    And I should see the detail "# of Work Days 1" in the employee view
    And I should see the text "Technician Pay" in the employee view
    And I should see the detail "Total Sale $105.70" in the employee view
    And I should see the detail "Net Total Sale $102.70" in the employee view
    And I should see the detail "Service Commission $31.62" in the employee view
    And I should see the detail "Product Commission $5.00" in the employee view
    And I should see the detail "Net Non-Cash Tip $9.75" in the employee view
    And I should see the detail "Tax Withheld on Cash ($0.44)" in the employee view
    And I should see the detail "Total Payout $40.93" in the employee view
    And I should see the detail "Pay 1 $31.72" in the employee view
    And I should see the detail "Pay 2 $9.21" in the employee view
    And I should see the text "Daily Details" in the employee view
    # NC Tip is incorrect, expected $9.75
    And I should see the Total Sales, Net Comm, NC Tip, Total Payout as "$105.70 $36.62 $9.75 $36.37" in employee view

    When I back to HOME page
    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I wait for the page fully loaded
    When I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "218.87"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$218.87"

    When I click on the first row for payment "$218.87" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Sydney" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

  Scenario: Commission details in the Owner View are calculated correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9969"
    Then I should see the employee "Venus" in the employee list

    When I select the "Venus" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    And I select the "GIFT CARD" category
    And I add the "Shampoo" service to my cart
    And I add the "Gift card $100" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "2222"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "2222" visible
    When I click on the "ADD ON" button in the popup dialog
    Then I should see the service "Gift card $100 (2222)" in my cart
    And I should see my cart showing 3 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "65.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$65.70" visible

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "10" from the numpad
    Then I should see "$10.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the button with id "payment" visible

    When I enter the amount "50"
    And I click on the element with id "payment"
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen

    When I wait for the page fully loaded
    And I search for "Venus"
    And I select the employee "Venus"
    And I wait for the page fully loaded
    Then I should see the Payroll Date default to today
    And I should see the technician name "Venus" in the employee view
    And I should see the payroll type "Commission" in the employee view
    And I should see the # of Work Days "1" in the employee view
    And I should see the text "Sale Summary" in the single payroll view
    And I should see the first Total "$115.70" in the single payroll view
    And I should see the detail "Product: $50.00" in the single payroll view
    And I should see the detail "Service: $65.70" in the single payroll view
    And I should see the second Total "($3.00)" in the single payroll view
    And I should see the detail "Item Discount: $0.00" in the single payroll view
    And I should see the detail "Ticket Discount: $0.00" in the single payroll view
    And I should see the detail "Item Supply Fee: ($2.00)" in the single payroll view
    And I should see the detail "Ticket Supply Fee: ($1.00)	" in the single payroll view
    And I should see the detail "Loyalty Redemption: $0.00" in the single payroll view
    And I should see the detail "Daily Maintenance Fee: ($5.00)" in the single payroll view
    And I should see the detail "Credit Card Fee: ($0.25)" in the single payroll view
    And I should see the detail "Tax Withheld on Cash: ($0.51)" in the single payroll view
    And I should see the detail "Net Total Sale: $112.70" in the single payroll view
    And I should see the detail "Product Commission: $5.00" in the single payroll view
    And I should see the detail "Service Commission: $37.62" in the single payroll view
    And I should see the detail "Net Commission: $42.62" in the single payroll view
    And I should see the detail "Net Non-Cash Tip (100.00%): $9.75" in the single payroll view
    And I should see the detail "Check (60.00%):  $25.57" in the single payroll view
    And I should see the detail "Cash (40.00%):  $17.05" in the single payroll view
    And I should see the detail "Pay 1: $35.32" in the single payroll view
    And I should see the detail "Pay 2: $11.54" in the single payroll view
    And I should see the detail "Total Payout: $46.86" in the single payroll view
    And I should see the detail "Gross Profit: $73.84" in the single payroll view

    When I back to HOME page
    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "229.17"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$229.17"

    When I click on the first row for payment "$229.17" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Venus" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page
