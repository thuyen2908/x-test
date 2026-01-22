@regression @smoke @slow
Feature: Timesheet

  Scenario: When clocking in then clocking out, the technician does not appear in the employee list
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3493"
    Then I should see the employee "Tessa" in the employee list

    When I clock out the timesheet with PIN "3493"
    Then I should not see the employee "Tessa" in the employee list

  Scenario: When clocking in others then clocking out, the technician does not appear in the employee list
    Given I am on the HOME page
    When I navigate to "Timesheet" on the navigation bar
    And I navigate to "Clock In Others" on the navigation bar
    Then I should see a popup dialog with title "Clock In Others"

    When I wait for the page fully loaded
    And I click to clock in for employee "Ashley"
    And I click on the "Close" button in the popup dialog
    Then I should see the employee "Ashley" in the employee list

    When I clock out the timesheet with PIN "1310"
    Then I should not see the employee "Ashley" in the employee list


