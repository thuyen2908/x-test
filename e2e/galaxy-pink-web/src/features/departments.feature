@regression @slow @page
Feature: Departments management

  Scenario: View the Departments management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Departments" label in the expanded list
    Then I should be redirected to DEPARTMENT page
    And I should see the "Departments" screen

  Scenario: Create a new department
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Departments" label in the expanded list
    Then I should be redirected to DEPARTMENT page
    And I should see the "Departments" screen
    When I click on the "Refresh" button 
    And I wait for the page fully loaded
    When I click on the "Add New" button
    Then I should see a popup dialog with title "Create New Department"
    When I fill the "Department Name" field with value "Pedicure & Manicure"
    And I select the "Department Type" with value "Service"
    And I click on the "Save" button 
    And I wait for the page fully loaded
    Then I should see the toast message "The data item has been created successfully" visible
    When I search for "Pedicure & Manicure"
    And I wait for the page fully loaded
    Then I should see the new "name" "Pedicure & Manicure", created at today, in the list
    And department type should be "Service"
    When I click on the action "Delete" button for item "Pedicure & Manicure"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    Then I should see the toast message "The data item has been permanently deleted successfully" visible

  Scenario: Copy to create a new department
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Departments" label in the expanded list
    Then I should be redirected to DEPARTMENT page
    And I should see the "Departments" screen
    When I click on the "Refresh" button 
    And I wait for the page fully loaded
    When I search for "Nails"
    And I wait for the page fully loaded
    Then I should see department "Nails" in the list
    When I click on the action "Copy" button for item "Nails"
    Then I should see a popup dialog with title "Copy Confirmation"
    When I click on the "confirm" button in the popup dialog
    Then I should see a popup dialog with title "Edit Department: Nails (0)"
    When I fill the "Department Name" field with value "Fancy Nails"
    And I click on the "Save" button
    Then I should see the toast message "The data item has been updated successfully" visible
    When I wait for the page fully loaded
    And I search for "Fancy Nails"
    Then I should see the new "name" "Fancy Nails", created at today, in the list
    When I double click on the department row "Fancy Nails"
    Then I should see a popup dialog with title "Edit Department: Fancy Nails"
    And The department name should be "Fancy Nails"
    And The department type should be "Service"
    When I click on the "Cancel" button
    And I search for "Fancy Nails"
    When I click on the action "Delete" button for item "Fancy Nails"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    Then I should see the toast message "The data item has been permanently deleted successfully" visible
    When I click on the "Refresh" button 
    And I wait for the page fully loaded
