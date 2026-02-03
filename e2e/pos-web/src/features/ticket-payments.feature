@regression @slow @page
Feature: Ticket Payments

  Scenario: Display the correct page title and nav tabs
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Ticket Payments" label in the menu list
    Then I should be redirected to TICKET_PAYMENTS page
    And I should see the "Ticket Payments" screen
    And I should see the Ticket table displayed correctly
    And I should see both date pickers default to today
    And I should see no results for invalid search

    When I select the "SERVICES/PRODUCTS" tab
    Then I should see the first Services-Products table displayed correctly

    When I select the "PAYMENTS" tab
    Then I should see the fist Payments table displayed correctly

    When I select the "TRANSACTIONS" tab
    Then I should see the "Batch Out" button visible in the payroll
    Then I should see the Transaction table displayed correctly

    When I select the "BATCH HISTORY" tab
    Then I should see the Batch history table displayed correctly

  Scenario: The Tickets tab displays data correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1250"
    Then I should see the employee "Hilary" in the employee list

    When I select the "Hilary" employee
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
    When I change the price to "68.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$68.70" visible

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

    Given I am on the TICKET_PAYMENTS page
    When I wait for the page fully loaded
    Then I should see the "Ticket Payments" screen

    When I wait for the page fully loaded
    And I search for "Hilary"
    And I wait for the page fully loaded
    Then I should see the "Total Sale" has value "$218.70" in the ticket payment
    And I should see the "Payment" has value "$232.26" in the ticket payment
    And I should see the "Surcharge" has value "$0.00" in the ticket payment
    And I should see the "Card Fee" has value "$3.56" in the ticket payment
    And I should see the "Tip" has value "$10.00" in the ticket payment
    And I should see the "Tax" has value "$0.00" in the ticket payment
    # And I should see the "Closed By" has value "Hilary" in the ticket payment
    # Then I should see the Total Sale, Payment, Surcharge, Card Fee, Tip, Tax, Closed By as "$218.70 $232.26 $3.56 $10.00 $0.00 Hilary" in the tickets details

    Given I am on the CLOSED_TICKETS page
    When I wait for the page fully loaded
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "232.26"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$232.26"

    When I click on the first row for payment "$232.26" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Hilary" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

  Scenario: The Services/Products tab displays data correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6118"
    Then I should see the employee "Valerie" in the employee list

    When I select the "Valerie" employee
    Then I should see the "Ticket View" screen
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "69.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$69" visible

    # Add Tip
    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "10" from the numpad
    Then I should see "$10.00" tip in my cart

    # Add discount item
    When I click on the item "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the discount "Open Discount"
    And I select the type "Amount" option
    And I enter the discount amount "3"
    And I click on the "Add Value" button in the popup dialog
    And I click on the "Apply" button in the popup dialog
    Then  I should see the "Owner Absorbs" absorption type in my cart

    # Add discount ticket
    When I click on the adding "Discount" button
    And I select the discount "Open Discount"
    Then I should see the discount type "Percent" visible
    When I enter the discount percent "10"
    And I click on the "Add" button in the popup dialog
    Then I should see the discount ticket non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    Given I am on the TICKET_PAYMENTS page
    When I wait for the page fully loaded
    Then I should see the "Ticket Payments" screen

    When I click on the "SERVICES/PRODUCTS" tab
    And I wait for the page fully loaded
    And I search for "Valerie"
    And I wait for the page fully loaded
    Then I should see the "Total Net Price" has value "$66.70" in the ticket payment
    And I should see the "Total Commission" has value "$40.02" in the ticket payment

    When I click on the first row for technician "Valerie" to expand details
    Then I should see the "Type" has value "Service" in the ticket payment
    And I should see the "Item Name" has value "Manicure" in the ticket payment
    And I should see the "Item Price" has value "$69.70" in the ticket payment
    And I should see the "Net Price" has value "$66.70" in the ticket payment
    And I should see the "Commission" has value "$40.02" in the ticket payment
    And I should see the "Non-Cash Tip" has value "$10.00" in the ticket payment
    And I should see the "Credit Card Fee" has value "($0.50)" in the ticket payment
    And I should see the "Total Ticket Discount" has value "($9.67)" in the ticket payment
    And I should see the "Discounts (Employee Absorbs)" has value "$0.00" in the ticket payment
    And I should see the "Loyalty (Employee Absorbs)" has value "$0.00" in the ticket payment
    And I should see the "Loyalty Comm Type" has value "OriginalPrice" in the ticket payment
    And I should see the "Item Supply Fee" has value "($2.00)" in the ticket payment
    And I should see the "Ticket Supply Fee" has value "($1.00)" in the ticket payment
    And I should see the "Item Disc $" has value "$0.00" in the ticket payment
    And I should see the "Item Disc %" has value "$0.00" in the ticket payment
    And I should see the "Ticket Disc $" has value "$0.00" in the ticket payment
    And I should see the "Ticket Disc %" has value "$0.00" in the ticket payment

    # And I should see the "Closed By" has value "Hilary" in the ticket payment
    # Then I should see the Total Sale, Payment, Surcharge, Card Fee, Tip, Tax, Closed By as "$218.70 $232.26 $3.56 $10.00 $0.00 Hilary" in the tickets details

    Given I am on the CLOSED_TICKETS page
    When I wait for the page fully loaded
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "71.83"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$71.83"

    When I click on the first row for payment "$71.83" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Valerie" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page



