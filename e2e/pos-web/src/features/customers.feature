@regression @slow @page
Feature: Customers management

  Scenario: View the Customers management page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Customers" label in the menu list
    Then I should be redirected to CUSTOMERS page
    And I should see the "Customers" screen

# Feature: Display default loyalty correct
#     Scenario: Display default loyalty correct
#     Given I am on the HOME page
#     When I clock in the timesheet with PIN "0917"
#     Then I should see the employee "Dylan" in the employee list
#     When I select the "Dylan" employee
#     And I add the "Manicure" service to my cart
#     Then I should see my cart showing 1 item added

#     When I click on the Select customer
#     And I click on the "CLICK HERE TO ADD CUSTOMER" button
#     Then I should see a popup dialog with title "Create New Customer"
#     And I should see the loyalty program "2 Points = $1" visible

  Scenario: Crud customer
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Customers" label in the menu list
    Then I should be redirected to CUSTOMERS page
    And I should see the "Customers" screen
    When I click on the "Add New Customer" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program default "2 Points = $1" visible

    When I fill the new customer name "Cuong Jayden" at new customer page
    When I fill the new customer phone at new customer page
    And I click on the "Save" button to save new customer
    Then I should be redirected to CUSTOMERS page

    When I search customer with keyword "Cuong Jay" and expect 1 results
    And I wait for the page fully loaded
  
    When I click on the edit button on the customer profile
    Then I should see the "Cuong Jayden" on First Name
    When I wait for the page fully loaded
    When I click on the "Tickets" button at the customer profile
    When I click on the "Information" button at the customer profile
    When I click on the "Edit" button
    When I input the note "." into the note box
    When I click on the "Save" button
    When I wait for the page fully loaded

    When I search customer with keyword "Cuong Jay" and expect 1 results
    When I click on the delete button on the customer profile
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button
    When I wait for the page fully loaded
    When I search customer with keyword "Cuong Jay" and expect 0 results
    Then I should not see customer "Cuong Jay" in the list
 


