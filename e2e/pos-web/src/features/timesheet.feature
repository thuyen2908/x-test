@regression @smoke @skip
Feature: Timesheet

  Scenario: Clock out
    Given I am on the HOME page
    When I clock out the timesheet using PIN "1234"
    Then I should not see the employee "Owner" in the employee list

  Scenario: Clock in others
    Given I am on the HOME page
    When I clock in others the timesheet
    Then I should see a popup dialog with title "Clock In Others"

    When I click to clock in the employee "Nick"
    And I click on the "Close" button
    Then I should see the employee "Nick" in the employee list

  Scenario: Clock in
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1234"
    Then I should see the employee "Owner" in the employee list


