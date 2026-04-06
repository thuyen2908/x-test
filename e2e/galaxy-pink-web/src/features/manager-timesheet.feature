@regression @slow @page
Feature: Timesheet

  Scenario: View the Timesheet page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Timesheet" label in the expanded list
    Then I should be redirected to MANAGER_TIMESHEET page
    And I should see the "Timesheet" screen

  Scenario: Delete then add the timesheet
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6286"
    And I wait for the page fully loaded
    Then I should see the employee "Brenna" in the employee list

    When I clock out the timesheet with PIN "6286"
    Then I should not see the employee "Brenna" in the employee list

    Given I am on the MANAGER_TIMESHEET page
    When I search for "Brenna"
    And I select the employee "Brenna"

    When I click on the action "Delete" button for item "Brenna"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    Then I should see the toast message "Item successfully deleted" visible

    When I click on the "Add New" button
    Then I should see a popup dialog with title "Create New Timesheet for Brenna"
    When I fill the "Regular Rate" field with value "10"
    And I click on the "Save" button in the popup dialog
    Then I should see the toast message "Attendance has been saved successfully" visible


