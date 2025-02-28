@regression @smoke @skip
Feature: Quick sale tickets

Scenario: Create a quick sale ticket for the Owner role
  Given I am on the HOME page
  When I clock in the timesheet with PIN "1234"
  Then I should see the employee "Owner" in the employee list

  When I click on the "Quick Sale" label in the header
  Then I should see the "Ticket View" screen
  And I should see the "Manicure" service

  When I add the "Manicure" service to my cart
  Then I should see my cart showing 1 item added

  When I click on the "Pay" button
  Then I should see the text "Payment Ticket" visible
  And I should see the text "Payment History" visible
  And I should see the button with id "payment" visible

  When I click on the element with id "payment"
  And I should see a popup dialog with title "Close Ticket"
  And I should see a popup dialog with title "CHANGE$0.00OK"
  When I click on the "OK" button in the popup dialog
  Then I should be redirected to HOME page

Scenario: Add an existing customer to a quick sale ticket
  Given I am on the HOME page
  Then I should see the employee "Owner" in the employee list

  When I click on the "Quick Sale" label in the header
  Then I should see the "Ticket View" screen
  And I should see the "Manicure" service

  When I add the "Manicure" service to my cart
  Then I should see my cart showing 1 item added

  When I click on the Select customer
  Then I should see the text "Click Here To Add Customers" visible
  When I add the "Tin" customer
  Then I should see the customer name on ticket

  When I click on the "Pay" button
  Then I should see the text "Payment Ticket" visible
  And I should see the text "Payment History" visible
  And I should see the button with id "payment" visible

  When I click on the element with id "payment"
  And I should see a popup dialog with title "Close Ticket"
  And I should see a popup dialog with title "CHANGE$0.00OK"
  When I click on the "OK" button in the popup dialog
  Then I should be redirected to HOME page

Scenario: Create a new customer on quick sale ticket
  Given I am on the HOME page
  Then I should see the employee "Owner" in the employee list

  When I click on the "Quick Sale" label in the header
  Then I should see the "Ticket View" screen
  And I should see the "Manicure" service

  When I add the "Manicure" service to my cart
  Then I should see my cart showing 1 item added

  When I click on the Select customer
  And I click on the text "Click Here To Add Customers"
  Then I should see a popup dialog with title "Create New Customer"
  When I create a new customer
  Then I should see a new customer on ticket

  When I click on the "Pay" button
  Then I should see the text "Payment Ticket" visible
  And I should see the text "Payment History" visible
  And I should see the button with id "payment" visible

  When I click on the element with id "payment"
  And I should see a popup dialog with title "Close Ticket"
  And I should see a popup dialog with title "CHANGE$0.00OK"
  When I click on the "OK" button in the popup dialog
  Then I should be redirected to HOME page

