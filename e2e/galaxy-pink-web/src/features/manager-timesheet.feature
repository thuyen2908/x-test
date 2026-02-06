@regression @slow @page
Feature: Timesheet

  Scenario: View the Timesheet page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Timesheet" label in the expanded list
    Then I should be redirected to MANAGER_TIMESHEET page
    And I should see the "Timesheet" screen
