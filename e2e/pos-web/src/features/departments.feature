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
    And I wait for the page fully loaded

    When I search department with keyword "Pedicure & Manicure" and expect 1 results
    And I wait for the page fully loaded
    Then I should see department "Pedicure & Manicure" in the list
    And department type should be "Service"
    When I search department with keyword "Pedicure & Manicure" and expect 1 results
    And I wait for the page fully loaded
    Then I should see department "Pedicure & Manicure" in the list

    When I click on the action "Delete" button of department
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click the "Delete" button in the dialog
    Then I should see the toast message "The data item has been permanently deleted successfully" visible

    When I search department with keyword "Pedicure & Manicure" and expect 0 results
    Then I should not see department "Pedicure & Manicure" in the list

  Scenario: Copy to create a new department
    Given I am on the DEPARTMENT page
    When I search department with keyword "Nails" and expect 1 results
    And I wait for the page fully loaded
    Then I should see department "Nails" in the list
    When I click on the action "Copy" button of department
    Then I should see a popup dialog with title "Copy Confirmation"

    When I click the "confirm" button in the dialog
    Then I should see a popup dialog with title "Edit Department: Nails (0)"

    When I fill the department name "Fancy Nails"
    And I click on the "Save" button
    And I clear department search
    Then I should see the toast message "The data item has been updated successfully" visible

    When I wait for the page fully loaded
    And I search department with keyword "Fancy Nails" and expect 1 results
    Then I should see department "Fancy Nails" in the list
    When I double click on the department row "Fancy Nails"
    Then I should see a popup dialog with title "Edit Department: Fancy Nails"
    And The department name should be "Fancy Nails"
    And The department type should be "Service"

    When I click on the "Cancel" button
    And I search department with keyword "Fancy Nails" and expect 1 results
    Then I should see department "Fancy Nails" in the list
    When I click on the action "Delete" button of department
    Then I should see a popup dialog with title "Delete Confirmation"

    When I click the "Delete" button in the dialog
    Then I should see the toast message "The data item has been permanently deleted successfully" visible

    When I search department with keyword "Fancy Nails" and expect 0 results
    Then I should not see department "Fancy Nails" in the list
