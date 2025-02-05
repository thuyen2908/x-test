@regression @smoke @skip
Feature: Waiting list

  Scenario: Add an existing customer to the waiting list
    Given I am on the HOME page
    When I click on the "CHECK-INS" button
    Then I should be redirected to WAITING-LIST page

    When I click on the "Add Customer" button
    Then I should see the text "Create Waiting" visible

    When I click on the Select customer
    Then I should see the text "Click Here To Add Customers" visible
    When I add the "Tin" customer
    Then I should see the customer name on ticket

    When I add the "Manicure" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I select the "Any Technician" employee
    Then I should see my cart showing 1 item added
    When I click on the "Save" button
    Then I should be redirected to WAITING-LIST page

  Scenario: Create a new customer & add him/her to the waiting list
    Given I am on the HOME page
    When I click on the "CHECK-INS" button
    Then I should be redirected to WAITING-LIST page

    When I click on the "Add Customer" button
    Then I should see the text "Create Waiting" visible

    When I click on the Select customer
    And I click on the text "Click Here To Add Customers"
    Then I should see a popup dialog with title "Create New Customer"
    When I create a new customer
    Then I should see a new customer on ticket

    When I add the "Manicure" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I select the "Any Technician" employee
    Then I should see my cart showing 1 item added
    When I click on the "Save" button
    Then I should be redirected to WAITING-LIST page
