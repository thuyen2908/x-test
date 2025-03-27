@regression @smoke @skip
Feature: Appointment

  Scenario: Create an appointment for Any Technician of an existing customer
    Given I am on the HOME page
    When I click on the "Appointment" label in the header
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    And I select the "Any Technician" employee from the technician dropdown
    Then I should see the title "Any Technician"

    When I double click on the time slot at "07:00 AM"
    Then I should see the "Create Appointment" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart
    And I should see the duration "20 minutes"

    When I add the "Tin" customer
    Then I should see a new customer "Tin" on ticket

    When I click on the "SAVE" button
    Then I should see the booked time at "07:00 AM - 07:20 AM"

  Scenario: Create an appointment for a specific employee of a new customer
    Given I am on the HOME page
    When I click on the "Appointment" label in the header
    Then I should be redirected to APPOINTMENT page

    When I wait for the page fully loaded
    And I select the "Anna" employee from the technician dropdown
    Then I should see the title "Anna"

    When I double click on the time slot at "07:00 AM"
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
    And I click on the "Save" button in the popup dialog
    Then I should see a new customer "Booking" on ticket

    When I click on the "SAVE" button
    Then I should see the booked time at "07:00 AM - 07:20 AM"
