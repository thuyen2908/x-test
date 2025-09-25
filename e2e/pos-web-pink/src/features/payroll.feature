@regression @smoke
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

  @skip
  Scenario: Commission payroll type calculate correctly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6789"
    Then I should see the employee "Sydney" in the employee list

    When I select the "Sydney" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "55.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$55.70" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the button with id "payment" visible

    When I enter the amount "10"
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
    And I should see the technician name "Sydney"
    And I should see the payroll type "Commission"
    And I should see the # of Work Days "1"
    And I should see the text "Technician Pay" visible
    And I should see the Total Sale "$55.70"
    And I should see the Net Total Sale "$52.70"
    And I should see the Service Commission "$31.62"
    And I shoud see the Product Commission "$0.00"
    And I should see the Daily Maintenance Fee "($5.00)"
    And I should see the Net Non-Cash Tip "$0.00"
    And I should see the Tax Withheld on Cash "($0.38)"




