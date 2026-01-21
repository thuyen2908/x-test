@slow @regression @smoke
Feature: Display default loyalty correct

    Scenario: Display default loyalty correct
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0917"
    Then I should see the employee "Dylan" in the employee list
    When I select the "Dylan" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the Select customer
    And I click on the "CLICK HERE TO ADD CUSTOMER" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible
