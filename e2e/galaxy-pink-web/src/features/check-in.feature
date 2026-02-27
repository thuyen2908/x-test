@slow @regression @smoke
Feature: Check In

  Scenario: Display categories and services correctly in check-in
    Given I am on the HOME page
    When I wait for the page fully loaded
    When I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible
    Then I should see the categories displayed correctly in check-in
    And I should see the services displayed correctly in check-in
    And I should see the "Next Available Service" service

  Scenario: Assign a service package to any technician and use the default waiting list technician when creating a ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Check-in"

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
    Then I should see the selected "WAITING LIST" tab on the Home page
    And I should see the customer "Check-in" in the waiting list
    And I should see the new customer icon
    And I should see the service "Combo 1" in the waiting list
    And I should see the technician "Any Technician" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Check-in" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Anna" in the ticket

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Update issuance after creating a waiting for an existing customer
    Given I am on the HOME page
    When I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I wait for the page fully loaded
    And I add the "6666666666" customer
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
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Alice" in the waiting list
    And I should see the service "Manicure" in the waiting list
    And I should see the service "Pedicure" in the waiting list
    And I should see the technician "Emily" in the waiting list
    And I should see the technician "Claire" in the waiting list

    When I click on the first row for customer "Alice" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Emily" in the ticket
    And I should see my cart showing 2 item added
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see the employee "Emily" in my cart
    And I should see the employee "Claire" in my cart

    When I click on the "Pay" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "CANCEL" button in the popup dialog
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$14.42" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    Given I am on the GIFT_CARD_BALANCE page
    When I click on the "LOYALTY" button
    And I search gift card "6666666666"

    # Then I should see the text "Customer: Alice" visible
    Then I should see the first date is today in the loyalty detail list
    And I should see the first type "Issuance" in the loyalty detail list
    And I should see the first amount "28" in the gift card detail list

  Scenario: Display service hint and get default quick sale technician when create ticket
    Given I am on the HOME page
    When I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Waiting"

    When I add the "Next Available Service" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Next Available" text inside the content section of the opening dialog
    Then I should see the service "MANI & PEDI" in my cart
    And I should see the employee "Next Available" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Waiting" in the waiting list
    And I should see the service "MANI & PEDI" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Waiting" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Christ" in the ticket
    And I should see the service hint
    And I should see the hint details "MANI & PEDI (Next Available)"

    When I wait for the page fully loaded
    And I add the "Acrylic removal" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "Christ" employee in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Editing a waiting to add service and create ticket
    Given I am on the HOME page
    When I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Editing"

    When I add the "Gel X" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Addison" text inside the content section of the opening dialog
    Then I should see the service "Gel X" in my cart
    And I should see the duration "30 mins" in my cart
    And I should see the employee "Addison" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Editing" in the waiting list
    And I should see the service "Gel X" in the waiting list
    And I should see the technician "Addison" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Editing" to expand details
    And I select the "Edit" on the Daily Task
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
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Editing" in the waiting list
    And I should see the service "Gel X" in the waiting list
    And I should see the service "Cut cuticle" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Editing" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Addison" in the ticket

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Make appointment for Next Available Service and fill duration
    Given I am on the HOME page
    When I wait for the page fully loaded
    When I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible
    And I should see the "Next Available Service" service

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Duration"

    When I select the "FULL SET & FILL IN" category
    When I add the "Next Available Service" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Next Available" text inside the content section of the opening dialog
    Then I should see the service "FULL SET & FILL IN" in my cart
    And I should see the employee "Next Available" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Duration" in the waiting list
    And I should see the service "FULL SET & FILL IN" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Duration" to expand details
    And I select the "Make Appt" on the Daily Task

    Then I should see a popup dialog with title "ENTER DURATION"
    When I enter the amount "10"
    And I click on the "OK" button in the popup dialog
		And I wait for the page fully loaded
    Then I should see the pin appointment

    When I click on the first row for customer "Duration" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View From Appointment" screen
    And I should see the user info "Christ" in the ticket
    And I should see the service hint
    And I should see the hint details "FULL SET & FILL IN (Next Available)"

    When I wait for the page fully loaded
    And I add the "Fill gel" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "Christ" employee in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Delete a waiting
    Given I am on the HOME page
    When I wait for the page fully loaded
    When I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Delete"

    When I select the "ADDITIONAL SERVICE" category
    And I add the "Next Available Service" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Next Available" text inside the content section of the opening dialog
    Then I should see the service "ADDITIONAL SERVICE" in my cart
    And I should see the employee "Next Available" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Delete" in the waiting list
    And I should see the service "ADDITIONAL SERVICE" in the waiting list

    When I click on the first row for customer "Delete" to expand details
    And I select the "Delete" on the Daily Task
    Then I should see a popup dialog with title "Remove Confirmation"
    When I click on the "confirm" button in the popup dialog
    And I wait for the page fully loaded
    Then I should not see the customer "Delete" in the waiting list
    Then I should see the toast message "Item successfully deleted" visible

  Scenario: Update the user info when changing technician for ticket check-in
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Update-user"

    When I add the "Acrylic removal" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Victoria" text inside the content section of the opening dialog
    Then I should see the service "Acrylic removal" in my cart
    And I should see the duration "30 mins" in my cart
    And I should see the employee "Victoria" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Update-user" in the waiting list
    And I should see the service "Acrylic removal" in the waiting list
    And I should see the technician "Victoria" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Update-user" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Victoria" in the ticket
    And I should see the "Pedicure" service

    When I wait for the page fully loaded
    And I add the "Pedicure" service to my cart
    Then I should see the service "Pedicure" in my cart

    When I select the service "Pedicure" in my cart
    Then I should see the ticket function menu
    When I select the "Anna" employee in the list item employee
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the group "Nails"
    Then I should see the "Anna" employee in my cart

    When I select the service "Acrylic removal" in my cart
    When I select the function "VOID ITEM" on the menu
    And I select the reason "Wrong Item"
    Then I should not see the service "Acrylic removal" in my cart
    And I should see the user info "Anna" in the ticket

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Recreate a waiting after voiding ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I navigate to "WAIT" on the navigation bar
    Then I should be redirected to CREATE_WAITING page
    And I should see the text "Create Waiting" visible

    When I click to create new customer with the default loyalty program "2 Points = $1"
    And I create the new customer name "Recreate"

    When I select the "FULL SET & FILL IN" category
    When I add the "Full set" service to my cart
    Then I should see a popup dialog with title "Pick Technician"
    When I click on the "Anna" text inside the content section of the opening dialog
    Then I should see the service "Full set" in my cart
    And I should see the duration "25 mins" in my cart

    When I click on the "SAVE" button
    And I wait for the page fully loaded
    Then I should see the selected "WAITING LIST" tab on the Home page

    When I wait for the page fully loaded
    Then I should see the customer "Recreate" in the waiting list
    And I should see the service "Full set" in the waiting list
    And I should see the technician "Anna" in the waiting list

    When I wait for the page fully loaded
    And I click on the first row for customer "Recreate" to expand details
    And I select the "Create Ticket" on the Daily Task
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    And I should see the user info "Anna" in the ticket

    When I wait for the page fully loaded
    And I click on the "Void Ticket" button
    And I select the reason "Mistake"
    And I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "WAITING LIST" tab
    And I wait for the page fully loaded
    And I click on the first row for customer "Recreate" to expand details
    And I select the "Create Ticket" on the Daily Task
    Then I should see the "Ticket View" screen

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page
