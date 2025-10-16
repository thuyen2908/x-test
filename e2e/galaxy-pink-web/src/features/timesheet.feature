@regression @smoke @slow
Feature: Timesheet

  Scenario: Clock in and clock out
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3493"
    Then I should see the employee "Tessa" in the employee list

    When I clock out the timesheet with PIN "3493"
    Then I should not see the employee "Tessa" in the employee list

  Scenario: Clock in others and clock out
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


