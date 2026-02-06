@regression @slow @page
Feature: Positions management

  Scenario: View the Positions management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Positions" label in the expanded list
    Then I should be redirected to POSITIONS page
    And I should see the "Positions" screen

  @skip
  Scenario: Add and then delete a Position
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Positions" label in the expanded list
    Then I should be redirected to POSITIONS page
    And I should see the "Positions" screen
    When I click on the "Add New" button
    Then I should see a popup dialog with title "Create New Position Type"
    When I fill the "Position Name" field with value "AutoTestPosition"
    When I fill the "Regular Rate" field with value "100"
    When I fill the "Overtime Rate" field with value "150"
    When I click on the "Save" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data item has been created successfully" visible
    When I click on the "Refresh" button
    And I wait for the page fully loaded
    When I search for "AutoTestPosition"
    And I wait for the page fully loaded
    Then I should see the new "jobName" "AutoTestPosition", created at today, in the list
    When I click on the action "Delete" button for item "AutoTestPosition"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been deleted permanently successfully" visible
