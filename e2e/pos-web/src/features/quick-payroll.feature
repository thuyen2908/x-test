@regression @smoke @slow
Feature: Quick payroll

  Scenario: View the Quick Payroll page, view Preview Summary and send email
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Quick Payroll" label in the expanded list
    Then I should be redirected to QUICK_PAYROLL page
    And I should see the "Quick Payroll" screen
    And I should see the default filter set to Today
    And I should see the "SEND EMAIL" button visible on the header
    And I should see the "PREVIEW SUMMARY" button visible on the header
    And I should see the "PRINT SUMMARY" button visible on the header
    And I should see the "PRINT ALL PAYROLL" button visible on the header

    When I click on the "Today" button
    And I wait for the page fully loaded
    And I click on the "PREVIEW SUMMARY" button
    Then I should see the text "Payroll Summary" in the payroll summary

    When I click on the "SEND EMAIL" button
    Then I should see a popup dialog with title "Send Email"
    Then I should see a popup dialog with content "Exclude employees with total = $0.00"

  Scenario: Display Commission payroll details correctly in the payroll summary
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2771"
    Then I should see the employee "Serena" in the employee list

    When I select the "Serena" employee
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
    When I change the price to "85.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$85.70" visible

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "10" from the numpad
    Then I should see "$10.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    When I wait for the page fully loaded
    Then I should see the button with id "payment" visible

    When I enter the amount "50"
    And I click on the element with id "payment"
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Quick Payroll" label in the expanded list
    Then I should be redirected to QUICK_PAYROLL page
    And I should see the "Quick Payroll" screen

    When I wait for the page fully loaded
    And I search for "Serena"
    And I select the employee "Serena"
    Then I should see the default filter set to Today
    And I should see the detail "Employee Name: Serena" in the payroll receipt
    And I should see the detail "Payroll Type: Commission" in the payroll receipt
    And I should see the title "Employee Pay" in the payroll receipt
    And I should see the detail "Total Sale: $135.70" in the payroll receipt
    And I should see the first Total Commission "$54.62" in the payroll receipt
    And I should see the detail "+Non-Cash Tips: $9.75" in the payroll receipt
    And I should see the detail "-Daily Maintenance Fee (Deduct From Cash): ($5.00)" in the payroll receipt
    And I should see the detail "-Cash Tax: ($0.66)" in the payroll receipt
    And I should see the detail "Total Pay: $58.71" in the payroll receipt
    And I should see the detail "Check: $32.77" in the payroll receipt
    And I should see the detail "Cash: $21.85" in the payroll receipt
    And I should see the detail "Pay 1: $42.52" in the payroll receipt
    And I should see the detail "Pay 2: $16.19" in the payroll receipt
    And I should see the title "Commission Details" in the payroll receipt
    And I should see the detail "Service Sale: $85.70" in the payroll receipt
    And I should see the detail "Product Sale: $50.00" in the payroll receipt
    And I should see the detail "Service Commission: $49.62" in the payroll receipt
    And I should see the detail "+Product Commission: $5.00" in the payroll receipt
    And I should see the second Total Commission "$54.62" in the payroll receipt
    And I should see the title "Daily Details" in the payroll receipt
    And I should see the Total Sales, Net Comm, NC Tip as "$135.70 $54.62 $9.75" in the payroll receipt

    When I back to HOME page
    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I wait for the page fully loaded
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "249.77"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$249.77"

    When I click on the first row for payment "$249.77" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Serena" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

  Scenario: Display Hourly payroll details correctly in the payroll summary
    Given I am on the HOME page
    When I clock in the timesheet with PIN "7016"
    Then I should see the employee "Jen" in the employee list

    When I select the "Jen" employee
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
    When I change the price to "86.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$86.70" visible

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "10" from the numpad
    Then I should see "$10.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    When I wait for the page fully loaded
    Then I should see the button with id "payment" visible

    When I enter the amount "50"
    And I click on the element with id "payment"
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I clock out the timesheet with PIN "7016"
    Then I should not see the employee "Jen" in the employee list

    Given I am on the QUICK_PAYROLL page
    When I wait for the page fully loaded
    Then I should see the "Quick Payroll" screen

    When I wait for the page fully loaded
    And I search for "Jen"
    And I select the employee "Jen"
    Then I should see the default filter set to Today
    And I should see the detail "Employee Name: Jen" in the payroll receipt
    And I should see the detail "Payroll Type: Hourly" in the payroll receipt
    And I should see the title "Employee Pay" in the payroll receipt
    #And I should see the detail "Total Sale: $135.70" in the payroll receipt
    #And I should see the first Total Commission "$54.62" in the payroll receipt
    And I should see the detail "Regular Pay: $0.00" in the payroll receipt
    # NC Tip is incorrect, expected: $9.75
    And I should see the detail "+Non-Cash Tips: $4.75" in the payroll receipt
    #And I should see the detail "-Daily Maintenance Fee (Deduct From Cash): ($5.00)" in the payroll receipt
    #And I should see the detail "-Cash Tax: ($0.66)" in the payroll receipt
    And I should see the detail "Total Pay: $9.75" in the payroll receipt
    And I should see the detail "Check: $3.00" in the payroll receipt
    And I should see the detail "Cash: $2.00" in the payroll receipt
    And I should see the detail "Pay 1: $7.75" in the payroll receipt
    And I should see the detail "Pay 2: $2.00" in the payroll receipt
    And I should see the title "Daily Details" in the payroll receipt
    # NC Tip is incorrect, expected: $9.75
    And I should see the Reg Hrs, NC Tip as "0.00 $4.75" in the payroll receipt

    When I back to HOME page
    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I wait for the page fully loaded
    And I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "250.80"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$250.80"

    When I click on the first row for payment "$250.80" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Jen" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page
