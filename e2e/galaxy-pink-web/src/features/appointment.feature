@regression @smoke @slow @fix
Feature: Appointment

  Scenario: Create an appointment for an existing customer, edit to change technician and create ticket
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
      # Filter technician
    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"

    When I double click on the time slot at "07:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I add the "Tin tin" customer
    Then I should see a new customer "Tin tin" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should see the customer "Tin tin" booked

    When I select the booked of "Tin tin"
    And I click on the "Edit" button on the right panel
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Tin tin" on ticket
    And I should see the time "07:00 AM" in my cart

    When I select the service "Manicure" in my cart
    Then I should see a popup dialog with title "Technician Multiple"
    When I click on the "Addison" text inside the content section of the opening dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Addison" employee in my cart

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    # And I wait for the page fully loaded
#check đến đây rồi mai làm tiếp nha
    When I click on the "Search" span
    Then I should see a popup dialog with title "Search Appointment"
    When I search customer with keyword "0000006868" and expect 1 results
    And I click on the "Check In" button
    Then I should see the "Ticket View From Appointment" screen
    And I should see the user info "Addison" in the ticket
    And I should see the service "Manicure" in my cart
    And I should see the employee "Addison" in my cart

    When I select the service "Manicure" in my cart
    And I change price amount "4.02"
    And I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page
    When I select the "CLOSED TICKET" tab

    When I search for "4.02" 
    Then I should see the first ticket of payment "$4.02"
    When I reopen to void ticket with payment amount "$4.02"
    Then I should see the selected "SERVICE" tab on the Home page

     When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
     When I click on the triangle open
    When I select to filter the "Addison" employee
    Then I should see the title "Addison"

     When I select the booked of "Tin tin"
    And I click on the "Delete" button on the right panel
    Then I should see a popup dialog with title "Confirm Delete"
    And I should see a popup dialog with content "Are you sure you want to delete?"
    When I click on the "confirm" button in the popup dialog
    Then I should see the toast message "Successfully deleted appointment for Tin tin !" visible

  Scenario: Create and edit an appointment then create ticket
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"

    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"

    When I double click on the time slot at "09:20 AM"
    # And I wait for the page fully loaded
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

   When I add the "Ton" customer
    Then I should see a new customer "Ton" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should be redirected to APPOINTMENT page

    Then I should see the customer "Ton" booked
    And I should see the time slot "09:20 AM - 09:40 AM" booked

    When I select the booked of "Ton"
    And I click on the "Edit" button on the right panel
    Then I should see the "Edit Appointment" screen
    And I should see the "Pedicure" service

    When I add the "Pedicure" service to my cart
    And I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should see the time slot "09:40 AM - 10:05 AM" booked

    When I select the time slot "09:20 AM - 09:40 AM" booked
    And I click on the "Check In" button on the header appointment
    # And I wait for the page fully loaded
    Then I should see the text "Ticket View From Appointment" visible
    And I should see the user info "Anna" in the ticket

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page
    When I select the "CLOSED TICKET" tab

    When I search for "14" 
    Then I should see the first ticket of payment "$14.00"
    When I reopen to void ticket with payment amount "$14.00"
    Then I should see the selected "SERVICE" tab on the Home page

    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    When I click on the triangle open
    When I select to filter the "Anna" employee
    Then I should see the title "Anna"

    When I select the booked of "Ton"
    And I click on the "Delete" button on the right panel
    Then I should see a popup dialog with title "Confirm Delete"
    And I should see a popup dialog with content "Are you sure you want to delete?"
    When I click on the "confirm" button in the popup dialog
    Then I should see the toast message "Successfully deleted appointment for Ton !" visible

  Scenario: Create an appointment for a new customer, edit to change technician and create ticket
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"


    When I double click on the time slot at "11:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"

    When I fill the new customer name "Booking"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Booking" on ticket

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should be redirected to APPOINTMENT page
    Then I should see the title "Anna"

    When I select the last booking in the time slot at "11:00 AM"
    And I click on the "Edit" button on the right panel
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Booking" on ticket
    And I should see the time "11:00 AM" in my cart

    When I select the service "Manicure" in my cart
    Then I should see a popup dialog with title "Technician Multiple"
    When I click on the "Addison" text inside the content section of the opening dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Addison" employee in my cart

    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should be redirected to APPOINTMENT page
    # When I wait for the page fully loaded
    Then I should see the title "Anna"

    When I select to filter the "Addison" employee
    Then I should see the title "Addison"

    When I select the last booking in the time slot at "11:00 AM"
    When I click on the "Check In" span
    Then I should see the "Ticket View From Appointment" screen
    And I should see the user info "Addison" in the ticket
    And I should see the service "Manicure" in my cart
    And I should see the employee "Addison" in my cart
    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page
    Then I should be redirected to HOME page

  Scenario: Use Employee Color for Appointment Header
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the color header for Any Technician displayed correctly
    And I should see the color header for employee 'Anna' displayed correctly

  Scenario: Sort Employee by Order
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    And I should see the employees sorted correctly

  
  Scenario: Update appointment status Check-In
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"
    When I double click on the time slot at "02:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"
    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    When I fill the new customer name "Ten"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Ten" on ticket
    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should see the title "Anna"
    When I select the last booking in the time slot at "02:00 AM"
    And I click on the "check In" span
    Then I should see the "Ticket View From Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Ten" on ticket
    When I back to HOME page
    # And I wait for the page fully loaded
    And I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"
    When I select the last booking in the time slot at "02:00 AM"
    And I click on the "Edit" button on the right panel
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Ten" on ticket
    And I should see the time "02:00 AM" in my cart
    And I should see the appointment status "Chosen Tech"
    And I should see the appointment status "None"
    And I should see the appointment status "Check In"
    When I click on the "CANCEL" button
    When I back to HOME page
    Then I should see the selected "SERVICE" tab on the Home page
    # tới đây rồi mai làm tiếp nha khúc này còn dích cách tắt ticket 4/03
    When I click ticket of customer "Ten"
    Then I should see the "Ticket View From Appointment" screen
     When I click on the "Void Ticket" button
    And I select the reason "Mistake"
    Then I should see a popup dialog with title "Confirm Void"
    When I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"
    When I select the booked of "Ten"
    And I click on the "Edit" button on the right panel 
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Anna" in my cart
    And I should see a new customer "Ten" on ticket  
    And I should see the current time in my cart 
    And I should see the appointment status "Chosen Tech"
    And I should see the appointment status "None"
    And I should see the appointment status "New"

    When I click on the "CANCEL" button
    When I select the booked of "Ten"
    And I click on the "Delete" button on the right panel   
    Then I should see a popup dialog with title "Confirm Delete"
    And I should see a popup dialog with content "Are you sure you want to delete?"
    When I click on the "confirm" button in the popup dialog
    Then I should see the title "Anna"
    Then I should see the toast message "Successfully deleted appointment for Ten !" visible
 # tới đây rồi mai làm tiếp nha khúc này còn dích cách tắt ticket 4/03
  # tới đây rồi mai làm tiếp nha khúc này còn dích cách tắt ticket 4/03
   # tới đây rồi mai làm tiếp nha khúc này còn dích cách tắt ticket 4/03
  
  Scenario: Update appointment status Complete
  Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Bella" employee
    Then I should see the title "Bella"
    When I double click on the time slot at "03:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"
    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    When I fill the new customer name "Tun"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Tun" on ticket
    When I click on the "SAVE" button
    And I handle the Confirm Validate Time dialog if it appears
    Then I should see the title "Bella"
    When I select the last booking in the time slot at "03:00 AM"
    And I click on the "check In" span
    Then I should see the "Ticket View From Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Bella" in my cart
    And I should see a new customer "Tun" on ticket
    When I select the service "Manicure" in my cart
    And I change price amount "428.46"
    When I pay the exact amount by "Cash"
    When I back to HOME page
    And I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Bella" employee
    Then I should see the title "Bella"
    When I select the booked of "Tun"
    And I click on the "Edit" button on the right panel
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Bella" in my cart
    And I should see a new customer "Tun" on ticket
    And I should see the appointment status "Chosen Tech"
    And I should see the appointment status "None"
    And I should see the appointment status "Completed"
    When I click on the "CANCEL" button
    When I back to HOME page
     When I select the "CLOSED TICKET" tab
    # And I wait for the page fully loaded

    When I search for "428.46"
    # And I wait for the page fully loaded
    Then I should see the first ticket of payment "$428.46"

    When I reopen to void ticket with payment amount "$428.46"
    Then I should see the selected "SERVICE" tab on the Home page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page
    Then I should see the title "Any Technician"
    When I click on the triangle open
    And I select to filter the "Bella" employee
    Then I should see the title "Bella"
    When I select the booked of "Tun"
    And I click on the "Edit" button on the right panel 
    Then I should see the "Edit Appointment" screen
    And I should see the service "Manicure" in my cart
    And I should see the employee "Bella" in my cart
    And I should see a new customer "Tun" on ticket  
    And I should see the current time in my cart 
    And I should see the appointment status "Chosen Tech"
    And I should see the appointment status "None"
    And I should see the appointment status "New"

    When I click on the "CANCEL" button
    When I select the booked of "Tun"
    And I click on the "Delete" button on the right panel   
    Then I should see a popup dialog with title "Confirm Delete"
    And I should see a popup dialog with content "Are you sure you want to delete?"
    When I click on the "confirm" button in the popup dialog
    Then I should see the title "Bella"
    Then I should see the toast message "Successfully deleted appointment for Tun !" visible

  Scenario: Enable Zoom In / Zoom Out
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    And I should see the icon zoom out

    When I click on the icon zoom out
    Then I should see a popup dialog with content "Zoom In / Zoom Out"

  Scenario: View Week display start on week correctly
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I select view "Week"
    Then I should see the start of the week as "Tue"

  
  Scenario: Add and delete block time slot
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I click on the "Block" span
    Then I should see a popup dialog containing the title "Create Blocked Time"

    When I select the "Bella" employee from the technician dropdown in the dialog
    And I fill the start time "08:00 AM"
    And I fill the end time "09:00 AM"
    And I fill the reason block "Off for an hour"
    And I click on the "Save" button
    # And I wait for the page fully loaded
    Then I should see the toast message "Blocked time for Bella has been saved successfully." visible

    # Filter technician
    When I click on the triangle open
    And I select to filter the "Bella" employee
    Then I should see the title "Bella"

    When I select the last booking in the time slot at "Blocked Time"
    And I click on the "Delete" button
    Then I should see a popup dialog with title "Confirm Delete"
    And I should see a popup dialog with content "Are you sure you want to delete?"
    And I should see a popup dialog with content "Blocked Time"
    And I should see a popup dialog with content "Technician: Bella"
    And I should see a popup dialog with content "08:00 AM - 09:00 AM"
    When I click on the "confirm" button in the popup dialog
    Then I should see the toast message "Blocked time for Bella has been deleted successfully!" visible


  Scenario: Add and delete block time ALL DAY
    Given I am on the HOME page
    When I navigate to "APPT BOOK" on the navigation bar
    Then I should be redirected to APPOINTMENT page

    # When I wait for the page fully loaded
    Then I should see the title "Any Technician"
    When I click on the "Block" span
    Then I should see a popup dialog containing the title "Create Blocked Time"

    When I select the "Anna" employee from the technician dropdown in the dialog
    And I switch ON "All Day"
    And I fill the reason block "Block all day"
    And I click on the "Save" button
    # And I wait for the page fully loaded
    Then I should see the toast message "Blocked time for Anna has been saved successfully." visible

    When I click on the triangle open
    And I select to filter the "Anna" employee
    Then I should see the title "Anna"

    When I select the last booking in the time slot at "Blocked Time"
    And I click on the "Delete" button
    Then I should see a popup dialog with title "Confirm Delete"
    And I should see a popup dialog with content "Are you sure you want to delete?"
    And I should see a popup dialog with content "Blocked Time"
    And I should see a popup dialog with content "Technician: Anna"
    And I should see a popup dialog with content "12:00 AM - 11:59 PM"
    When I click on the "confirm" button in the popup dialog
    Then I should see the toast message "Blocked time for Anna has been deleted successfully!" visible
