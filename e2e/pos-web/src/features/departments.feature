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
    Given I am on the DEPARTMENT page
    When I click on the "Add New" button
    Then I should see a popup dialog with title "Create New Department"

    When I fill the department name "Pedicure & Manicure"
    And I select department type "Service"
    And I click on the "Save" button
    Then I should see the toast message "The data item has been created successfully" visible

    When I click on refresh department
    And I wait for the page fully loaded
    And I search department with keyword "Pedicure & Manicure" and expect 1 results

    And I wait for the page fully loaded
    Then I should see department "Pedicure & Manicure" in the list
    And department type should be "Service"

  Scenario: Copy to create a new department
    Given I am on the DEPARTMENT page
    When I search department with keyword "Pedicure & Manicure" and expect 1 results
    And I wait for the page fully loaded
    Then I should see department "Pedicure & Manicure" in the list
    When I click on the action "Copy" button of department
    Then I should see a popup dialog with title "Copy Confirmation"

    When I click the "confirm" button in the dialog
    Then I should see the toast message "The item has been copied successfully" visible
    And I should see a popup dialog with title "Edit Department: Pedicure & Manicure (0)"

  Scenario: View and edit a department
    Given I am on the DEPARTMENT page
    When I search department with keyword "Pedicure & Manicure (0)" and expect 1 results
    Then I should see department "Pedicure & Manicure (0)" in the list
    When I double click on the department row "Pedicure & Manicure (0)"
    Then I should see a popup dialog with title "Edit Department: Pedicure & Manicure (0)"

    When I fill the department name "Updated Pedicure & Manicure"
    And I click on the "Save" button
    Then I should see the toast message "The data item has been updated successfully" visible

    When I search department with keyword "Updated Pedicure & Manicure" and expect 1 results
    Then I should see department "Updated Pedicure & Manicure" in the list
    When I double click on the department row "Updated Pedicure & Manicure"
    Then I should see a popup dialog with title "Edit Department: Updated Pedicure & Manicure"
    And the department name should be "Updated Pedicure & Manicure"
    And the department type should be "Service"

  Scenario: Delete a department
    Given I am on the DEPARTMENT page
    When I search department with keyword "Updated Pedicure & Manicure" and expect 1 results
    Then I should see department "Updated Pedicure & Manicure" in the list
    When I click on the action "Delete" button of department
    Then I should see a popup dialog with title "Delete Confirmation"

    When I click the "Delete" button in the dialog
    Then I should see the toast message "The data item has been permanently deleted successfully" visible

    When I search department with keyword "Updated Pedicure & Manicure" and expect 0 results
    Then I should not see department "Updated Pedicure & Manicure" in the list