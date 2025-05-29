@regression @smoke @slow
Feature: Appointment
  @skip
  Scenario: Create an appointment for an existing customer, edit to change technician and create ticket
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I double click on the time slot at "07:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I add the "Tin" customer
    Then I should see a new customer "Tin" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should see the customer "Tin" booked

    When I select the booked of "Tin"
    And I click on the "Edit" button
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Tin" on ticket
    And I should see the time "07:00 AM" in my cart

    When I select the service "Manicure" in my cart
    Then I should see a popup dialog with title "Technician Multiple"
    When I click on the "Addison" text inside the content section of the opening dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Addison" employee in my cart

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    And I wait for the page fully loaded
    And I select the last booking in the time slot at "07:00 AM"
    And I click on the "Create Ticket" button
    Then I should see the "Ticket View From Appointment" screen
    And I should see the user info "Addison" in the ticket
    And I should see the service "Manicure" in my cart
    And I should see the employee "Addison" in my cart

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Create an appointment for a new customer, edit to change technician and create ticket
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I double click on the time slot at "09:20 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Booking"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Booking" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should be redirected to APPOINTMENT page
    And I should see the title "Any Technician"

    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I select the last booking in the time slot at "09:20 AM"
    And I click on the "Edit" button
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Booking" on ticket
    And I should see the time "09:20 AM" in my cart

    When I select the service "Manicure" in my cart
    Then I should see a popup dialog with title "Technician Multiple"
    When I click on the "Addison" text inside the content section of the opening dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Addison" employee in my cart

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should be redirected to APPOINTMENT page
    When I wait for the page fully loaded
    Then I should see the title "Any Technician"

    When I select the "Addison" employee from the technician dropdown
    Then I should see the title "Addison"

    When I select the last booking in the time slot at "09:20 AM"
    And I click on the "Create Ticket" button
    Then I should see the "Ticket View From Appointment" screen
    And I should see the user info "Addison" in the ticket
    And I should see the service "Manicure" in my cart
    And I should see the employee "Addison" in my cart

    When I click on the "PAY" button
    And I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Use Employee Color for Appointment Header
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the color header for Any Technician displayed correctly
    And I should see the color header for employee 'Anna' displayed correctly

  Scenario: Sort Employee by Order
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    And I should see the employees sorted correctly

  Scenario: Update appointment status Check-In
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I double click on the time slot at "08:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Check-In"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Check-In" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I select the last booking in the time slot at "08:00 AM"
    And I click on the "Create Ticket" button
    Then I should see the "Ticket View From Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Check-In" on ticket

    When I back to HOME page
    And I wait for the page fully loaded
    And I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"
    When I select the last booking in the time slot at "08:00 AM"
    And I click on the "Edit" button

    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Check-In" on ticket
    And I should see the time "08:00 AM" in my cart
    And I should see the appointment status "Chosen Tech"
    And I should see the appointment status "None"
    And I should see the appointment status "Check In"

  Scenario: Update appointment status Complete
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I double click on the time slot at "10:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Complete"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Complete" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I select the last booking in the time slot at "10:00 AM"
    And I click on the "Create Ticket" button
    Then I should see the "Ticket View From Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Complete" on ticket

    When I click on the "PAY" button
    And I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I wait for the page fully loaded
    And I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"
    When I select the last booking in the time slot at "10:00 AM"
    And I click on the "Edit" button

    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Complete" on ticket
    And I should see the time "10:00 AM" in my cart
    And I should see the appointment status "Chosen Tech"
    And I should see the appointment status "None"
    And I should see the appointment status "Completed"

  Scenario: Enable Zoom In / Zoom Out
    Given I am on the HOME page
    When I navigate to "Appointment" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    And I should see the icon zoom out

    When I click on the icon zoom out
    Then I should see a popup dialog with content "Zoom In / Zoom Out"
