@regression @smoke
Feature: Clocked out

  @slow
  Scenario: Clock out technician
    Given I am on the HOME page
    When I clock out the timesheet

