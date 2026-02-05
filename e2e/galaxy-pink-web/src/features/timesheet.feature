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
    When I click on the functions
    And I select the "Clock In Others" on the Daily Task
    And I wait for the page fully loaded
    Then I should be redirected to CLOCK_IN_OTHERS page
    And I should see the text "Clock In Others" visible

    When I wait for the page fully loaded
    And I click button clock in for employee "Ashley"
    And I back to HOME page
    And I wait for the page fully loaded
    Then I should see the employee "Ashley" in the employee list

    When I clock out the timesheet with PIN "1310"
    Then I should not see the employee "Ashley" in the employee list


