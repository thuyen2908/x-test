@regression @smoke @skip
Feature: Appointment

  Scenario: Create ticket from an appointment of an existing customer
    Given I am on the HOME page
    When I click on the "Appointment" label in the header
    Then I should be redirected to APPOINTMENT page

    When I book the time slot at "07:00 AM" for "Anna"
    Then I should see the text "Create Appointment" visible

    When I click on the Select customer
    Then I should see the text "Click Here To Add Customers" visible
    When I add the "Tin" customer
    Then I should see the customer name on ticket

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "SAVE" button
    Then I should be redirected to APPOINTMENT page
    And The appointment should be scheduled with "Anna" at "07:00 AM" visible

    When I select the appointment for "Anna" at "07:00 AM" to create ticket
    And I click on the "Create Ticket" button
    Then I should see the text "Ticket View" visible

    When I click on the "PAY" button
    Then I should see a popup dialog with title "REWARD"
    When I click on the "OK" button in the popup dialog
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Cash" payment
    And I click on the element with id "payment"
    Then I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Create ticket from an appointment of a new customer
    Given I am on the HOME page
    When I click on the "Appointment" label in the header
    Then I should be redirected to APPOINTMENT page

    When I book the time slot at "09:00 AM" for "Anna"
    Then I should see the text "Create Appointment" visible

    When I click on the Select customer
    And I click on the text "Click Here To Add Customers"
    Then I should see a popup dialog with title "Create New Customer"
    When I create a new customer
    Then I should see a new customer on ticket

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "SAVE" button
    Then I should be redirected to APPOINTMENT page
    And The appointment should be scheduled with "Anna" at "07:00 AM" visible

    When I select the appointment for "Anna" at "07:00 AM" to create ticket
    And I click on the "Create Ticket" button
    Then I should see the text "Ticket View" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

