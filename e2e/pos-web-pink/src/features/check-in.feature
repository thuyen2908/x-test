@slow @regression @smoke
Feature: Check In

  Scenario: Create a waiting for new customer, assign Service Package to Any Technician and create ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    Then I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Check-in"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Check-in" on ticket

    When I add the "Combo 1" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Any Technician" text inside the content section of the opening dialog
    Then I should see the service "Combo 1" in my cart
    And I should see the duration "45 mins" in my cart
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see multiple "Any Technician" employees in my cart
    And I should see the employee "Any Technician" for all items in a package in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Check-in" in the waiting list
    And I should see the service "Combo 1" in the waiting list
    And I should see the technician "Any Technician" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Check-in" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Anna" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Create a waiting for existing customer, assign services to specific employees and create ticket
    Given I am on the HOME page
    When I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button
    Then I should see the text "Create Waiting" visible
    And I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

    When I add the "Alice" customer
    Then I should see a new customer "Alice" on ticket

    When I add the "Manicure" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Emily" text inside the content section of the opening dialog
    And I add the "Pedicure" service to my cart
    And I click on the "Claire" text inside the content section of the opening dialog

    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 mins" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see the duration "25 mins" in my cart
    And I should see the employee "Emily" in my cart
    And I should see the employee "Claire" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Alice" in the waiting list
    And I should see the service "Manicure" in the waiting list
    And I should see the service "Pedicure" in the waiting list
    And I should see the technician "Emily" in the waiting list
    And I should see the technician "Claire" in the waiting list

    When I click on the first row for customer "Alice" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Emily" in the ticket
    And I should see my cart showing 2 item added
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see the employee "Emily" in my cart
    And I should see the employee "Claire" in my cart

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Display service hint in ticket view
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    Then I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Waiting"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Waiting" on ticket

    When I add the "Next Available Service" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Next Available" text inside the content section of the opening dialog
    Then I should see the service "MANI & PEDI" in my cart
    And I should see the employee "Next Available" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Waiting" in the waiting list
    And I should see the service "MANI & PEDI" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Waiting" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Anna" in the ticket
    And I should see the service hint
    And I should see the hint details "MANI & PEDI (Next Available)"

    When I wait for the page fully loaded
    And I add the "Acrylic removal" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "Anna" employee in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Editing a waiting to add service and create ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    Then I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Editing"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Editing" on ticket

    When I add the "Gel X" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Addison" text inside the content section of the opening dialog
    Then I should see the service "Gel X" in my cart
    And I should see the duration "30 mins" in my cart
    And I should see the employee "Addison" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Editing" in the waiting list
    And I should see the service "Gel X" in the waiting list
    And I should see the technician "Addison" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Editing" to expand details
    Then I should see the "Edit" button visible

    When I click on the "Edit" button
    Then I should see the "Edit Waiting" screen
    And I should see a new customer "Editing" on ticket
    And I should see the service "Gel X" in my cart
    And I should see the employee "Addison" in my cart

    When I add the "Cut cuticle" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Addison" text inside the content section of the opening dialog
    Then I should see the service "Cut cuticle" in my cart
    And I should see the duration "25 mins" in my cart
    And I should see multiple "Addison" employees in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page
    When I wait for the page fully loaded
    Then I should see the customer "Editing" in the waiting list
    And I should see the service "Gel X" in the waiting list
    And I should see the service "Cut cuticle" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Editing" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Addison" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Make appointment for Next Available Service and fill duration
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    Then I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Duration"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Duration" on ticket

    When I select the "FULL SET & FILL IN" category
    When I add the "Next Available Service" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Next Available" text inside the content section of the opening dialog
    Then I should see the service "FULL SET & FILL IN" in my cart
    And I should see the employee "Next Available" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Duration" in the waiting list
    And I should see the service "FULL SET & FILL IN" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Duration" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Make Appt" button
    Then I should see a popup dialog with title "ENTER DURATION"
    When I enter the amount "10"
    And I click on the "OK" button in the popup dialog
		And I wait for the page fully loaded
    Then I should see the pin appointment

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View From Appointment" screen
    And I should see the user info "Anna" in the ticket
    And I should see the service hint
    And I should see the hint details "FULL SET & FILL IN (Next Available)"

    When I wait for the page fully loaded
    And I add the "Fill gel" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "Anna" employee in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Delete a waiting
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    Then I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Delete"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Delete" on ticket

    When I select the "ADDITIONAL SERVICE" category
    And I add the "Next Available Service" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Next Available" text inside the content section of the opening dialog
    Then I should see the service "ADDITIONAL SERVICE" in my cart
    And I should see the employee "Next Available" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Delete" in the waiting list
    And I should see the service "ADDITIONAL SERVICE" in the waiting list

    When I click on the first row for customer "Delete" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Delete" button
    Then I should see a popup dialog with title "Remove Confirmation"
    When I click on the "confirm" button in the popup dialog
    And I wait for the page fully loaded
    Then I should not see the customer "Delete" in the waiting list

  Scenario: Update the user info when changing technician for ticket check-in
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible
    And I should see the "Next Available Service" service

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Update-user"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Update-user" on ticket

    When I add the "Acrylic removal" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Victoria" text inside the content section of the opening dialog
    Then I should see the service "Acrylic removal" in my cart
    And I should see the duration "30 mins" in my cart
    And I should see the employee "Victoria" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Update-user" in the waiting list
    And I should see the service "Acrylic removal" in the waiting list
    And I should see the technician "Victoria" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Update-user" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Victoria" in the ticket
    And I should see the "Pedicure" service

    When I wait for the page fully loaded
    And I add the "Pedicure" service to my cart
    Then I should see the service "Pedicure" in my cart

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Pedicure" service in the dialog
    And I select the "Anna" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Anna" employee in my cart

    When I click on the remove item service "Acrylic removal"
    Then I should not see the service "Acrylic removal" in my cart
    And I should see the user info "Anna" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Recreate a waiting after voiding ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page

    When I click on the "Add Customer" button in the waiting page
    Then I should see the text "Create Waiting" visible

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Recreate"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Recreate" on ticket

    When I select the "FULL SET & FILL IN" category
    When I add the "Full set" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Anna" text inside the content section of the opening dialog
    Then I should see the service "Full set" in my cart
    And I should see the duration "25 mins" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should be redirected to WAITING_LIST page

    When I wait for the page fully loaded
    Then I should see the customer "Recreate" in the waiting list
    And I should see the service "Full set" in the waiting list
    And I should see the technician "Anna" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Recreate" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    And I should see the user info "Anna" in the ticket
    When I wait for the page fully loaded
    And I void the current open ticket with reason "Mistake"
    Then I should be redirected to HOME page

    When I click on the "Check In" label in the header
    Then I should be redirected to WAITING_LIST page
    When I wait for the page fully loaded
    And I click on the first row for customer "Recreate" to expand details
    Then I should see the "Create Ticket" button visible

    When I click on the "Create Ticket" button
    Then I should see the "Ticket View" screen
    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page
