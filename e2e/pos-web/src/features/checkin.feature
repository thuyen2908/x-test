@slow @regression @smoke @skip
Feature: Check In

  Scenario: Create a waiting for new customer and assign Service Package to Any Technician
    Given I am on the HOME page
    When I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Check-in"
    And I fill the new customer phone
    And I click on the "Save" button in the popup dialog
    Then I should see a new customer "Check-in" on ticket

    When I add the "Combo 1" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I select the "Any Technician" employee
    Then I should see my cart showing 1 item added
    And I should see the service "Combo 1" in my cart
    And I should see the duration "45 mins" in my cart
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see the "Any Technician" employee in my cart
    And I should see the employee "Any Technician" for package item in my cart

    When I click on the "Save" button
    Then I should be redirected to WAITING_LIST page
    And I should see the customer "Check-in" in the waiting list
    And I should see the service "Combo 1" in the waiting list
    And I should see the technician "Any Technician" in the waiting list

  Scenario: Create a waiting for new customer and assign Service Package to a specific employee
    Given I am on the HOME page
    When I click on the "Check In" label in the header
    Then I should be redirected to WAITING-LIST page

    When I click on the "Add Customer" button
    Then I should see the text "Create Waiting" visible
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Check-in"
    And I fill the new customer phone
    And I click on the "Save" button in the popup dialog
    Then I should see a new customer "Check-in" on ticket

    When I add the "Combo 1" service to my cart
    Then I should see a popup dialog with title "Laura"
    When I select the "Any Technician" employee
    Then I should see my cart showing 1 item added
    And I should see the service "Combo 1" in my cart
    And I should see the duration "45 mins" in my cart
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see the "Laura" employee in my cart
    And I should see the employee "Laura" for package item in my cart

    When I click on the "Save" button
    Then I should be redirected to WAITING-LIST page
    And I should see the customer "Check-in" in the waiting list
    And I should see the service "Combo 1" in the waiting list
    And I should see the technician "Laura" in the waiting list
