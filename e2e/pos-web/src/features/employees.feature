@regression @slow @page
Feature: Employee management

  Scenario: View the Employees management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Employees" label in the expanded list
    Then I should be redirected to EMPLOYEES page
    And I should see the "Employees" screen

  Scenario: Create a new Employee
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list   
    And I select the "Employees" label in the expanded list
    Then I should be redirected to EMPLOYEES page
    And I should see the "Employees" screen
    When I click on the "Add New" button 
    Then I should be redirected to CREMPLOYEES page
    And I should see the "Create Employee" screen
    When I fill the "First Name" field with value "AutoTestFirstName"
    And I fill the "Nick Name" field with value "AutoTestNickName"
    And I Select the "Job Title" with value "Nail Tech"
    And I Select the "Role Tech" with value "Employee"
    When I click on the "Get New Password" button
    And I click on the "Same as Business Hours" button
    When I select the "Compensation Info" tab
    And I wait for the page fully loaded
    And I Select the "Payroll Type" with value "Commission"
    # And I fill the Check ratio with value "50"
    And I fill the "Non-cash tip" field with value "100"
    And I Select the "Non-cash Tip Option" with value "Add To Check"
    And I fill the Commission Services "Massage" with value "60" for the new employee
    And I fill the Commission Services "Facia" with value "50" for the new employee
    And I fill the Commission Services "Hair" with value "40" for the new employee
    And I fill the Commission Services "Nail" with value "30" for the new employee
    And I fill the Commission Services "Waxing" with value "20" for the new employee
    And I fill the Commission Services "Eyelash" with value "10" for the new employee
    When I select the "Service/Product" tab
    And I switch ON "Select All" select all
    When I select the "Queue Group" tab
    And I switch ON "Select All" select all
    And I Select the "Default Queue Group For Appt" with value "Nails"
    When I click on the "Save" button
    And I wait for the page fully loaded
    Then I should be redirected to EMPLOYEES page
    And I should see the "Employees" screen
    When I search for "autoTestFirstName"
    And I wait for the page fully loaded
    Then I should see the new Employee "AutoTestFirstName", Role "Employee", in the Employees list
    When I click on the action "Delete" button for item "AutoTestFirstName"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "the employee deleted successfully" visible
    
    

    




    