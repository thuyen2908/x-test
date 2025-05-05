@regression @smoke
Feature: Payroll

  Scenario: Verify employee-specific Single Payroll information loads correctly
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Payroll" label in the expanded list
    Then I should be redirected to PAYROLL page
    And I should see the "Payroll" screen
    And I should see the "Recalculation" button disable
    And I should see the "Save" button disable
    And I should see the "Print" button disable

    When I select the employee "Anna"
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

    When I select the employee "Anna"
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

    When I select the employee "Anna"
    And I wait for the page fully loaded
    And I click on the "TIMESHEET" tab
    Then I should see the text "Date" visible
    And I should see the text "Hours" visible
    And I should see the text "Maintenance Fee" visible


