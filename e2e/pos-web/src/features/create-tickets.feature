@regression @smoke
Feature: Create tickets

  @slow
  Scenario: Create a ticket for the Owner role
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1234"
    Then I should see the employee "Owner" in the employee list

    When I select the "Owner" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    Then I wait for the network to be idle
    When I add the "Manicure" service to my cart
    Then I wait for the network to be idle
    And I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I wait for the network to be idle
    And I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Add an existing customer to a new ticket and pay with Loyalty points
    Given I am on the HOME page
    When I select the "Owner" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount displayed

    When I click on the Select customer
    Then I should see the text "Click Here To Add Customers" visible
    When I add the "Tin" customer
    Then I should see the customer name on ticket

    When I click on the "Pay" button
    Then I should see a popup dialog with title "REWARD"
    When I click on the "OK" button in the popup dialog
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the text "BALANCE" visible

    When I redeem my loyalty points
    And I click on the "OK" button
    Then I wait for the network to be idle
    Then I should be redirected to HOME page

  @skip
  Scenario: Create a new customer on the fly
    Given I am on the HOME page
    When I select the "Owner" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount displayed

    When I click on the Select customer
    And I click on the text "Click Here To Add Customers"
    Then I should see a popup dialog with title "Create New Customer"
    When I create a new customer
    Then I should see a new customer on ticket

    When I click on the "Pay" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the element with id "payment"
    Then I wait for the network to be idle
    And I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket with multiple technicians
    Given I am on the HOME page
    Then I wait for the network to be idle
    When I select the "Tina" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    Then I wait for the network to be idle
    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added
    And I should see the tax amount displayed

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Anna" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Anna" employee in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I wait for the network to be idle
    And I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Create a ticket, add Tip and pay with Credit card
    Given I am on the HOME page
    When I select the "Laura" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    Then I wait for the network to be idle
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount displayed

    When I click on the element with id "tip"
    Then I should see a popup dialog with title "Add Tip"
    When I fill $5 from the numpad
    Then I should see $5.00 tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number 1234
    And I click on the element with id "payment"
    Then I wait for the network to be idle
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket and pay with Gift Card type
    Given I am on the HOME page
    When I select the "Emma" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    Then I wait for the network to be idle
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount displayed

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card 1111
    And I click on the "Check Balance" button
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket and pay with Zelle type
    Given I am on the HOME page
    Then I wait for the network to be idle
    When I select the "Hanna" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    Then I wait for the network to be idle
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount displayed

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Zelle" payment type
    And I click on the element with id "payment"
    Then I wait for the network to be idle
    Then I should be redirected to HOME page

  @skip
  Scenario: Split tip on ticket after paying by Credit card
    Given I am on the HOME page
    When I select the "Brian" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    Then I wait for the network to be idle
    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the element with id "technician"
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Anna" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Anna" employee in my cart

    When I click on the element with id "tip"
    Then I should see a popup dialog with title "Add Tip"
    When I fill $5 from the numpad
    Then I should see $5.00 tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number 1234
    And I click on the element with id "payment"
    And I click on the "Percent Split" button
    Then I should see the "Close Ticket" button is enabled

    When I click on the "Close Ticket" button
    Then I should see a popup dialog with title "Close Ticket"
    When I click on the "Confirm" button in the popup dialog
    Then I should be redirected to HOME page
