@regression @slow @page
Feature: Close Out report

  Scenario: View the Close Out page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Close Out" label in the menu list
    Then I should be redirected to CLOSE_OUT page
    And I should see the "Close Out" screen

  Scenario: Technician report display correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "7518"
    Then I should see the employee "Elena" in the employee list

    When I select the "Elena" employee
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
    And I change price amount "71.7"
    And I add tip amount "10"

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I enter the amount "50"
    And I click on the element with id "payment"
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    Given I am on the CLOSE_OUT page
    Then I should see the "Close Out" screen

    When I search for "Elena" and select the result
    Then I should see the header "Technician Report" in the bill render
    And I should see the detail "Technician Name: Elena" in the bill render
    And I should see the title "Item Sales Details"
    And I should see the "Item Name" with value "Manicure Shampoo Gift card $100" in the sale row detail
    And I should see the "QTY" with value "3" in the sale row detail
    And I should see the "Tip" with value "$10.00" in the sale row detail
    And I should see the "Amount" with value "$221.70" in the sale row detail
    And I should see the title "Summary"
    And I should see the summary detail "Gift Card Sale $100.00" in the bill render
    And I should see the summary detail "Service/Product Sale $121.70" in the bill render
    And I should see the summary detail "Net Total Sale $118.70" in the bill render
    And I should see the summary detail "Commission $46.22" in the bill render
    And I should see the summary detail "Non-Cash Tip $10.00" in the bill render
    And I should see the summary detail "CASH RECEIVED $50.00" in the bill render
    And I should see the summary detail "CASH IN/OUT $0.00" in the bill render
    And I should see the summary detail "I OWE SALON $50.00" in the bill render

    Given I am on the CLOSED_TICKETS page
    When I wait for the page fully loaded
    And I search for "235.35"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$235.35"

    When I reopen to void ticket with payment amount "$235.35"
    Then I should be redirected to HOME page
    And I should not see the employee "Elena" in the ticket list

  Scenario: Technician report summary display correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "7298"
    Then I should see the employee "Gemma" in the employee list

    When I select the "Gemma" employee
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
    And I change price amount "72.7"
    And I add tip amount "10"

    And I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I enter the amount "50"
    And I click on the element with id "payment"
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    Given I am on the CLOSE_OUT page
    Then I should see the "Close Out" screen

    When I click on the "Technician Report" button
    Then I should see the header "Technician Report Summary" in the bill render
    And I should see the title "Sale By Technicians"
    And I should see the Tech, Deductions, Tip, Amount as "Gemma ($3.00) $10.00 $219.70" in the bill render

    Given I am on the CLOSED_TICKETS page
    When I wait for the page fully loaded
    And I search for "236.38"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$236.38"

    When I reopen to void ticket with payment amount "$236.38"
    Then I should be redirected to HOME page
    And I should not see the employee "Gemma" in the ticket list
