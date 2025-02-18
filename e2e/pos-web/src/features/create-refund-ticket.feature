@regression @smoke @skip
Feature: Create a refund ticket

Scenario: Create a refund ticket
Given I am on the HOME page
When I clock in the timesheet
Then I should see the employee "Owner" in the employee list

When I click on the menu
And I select the lable "Refund" on the list
Then I should see a popup dialog with title "Create Ticket Refund"

When I fill "$5" from numpad
And I click on the "OK" button

Then I should see the text "Ticket View" visible
And I should see the "Manicure" service
When I add the "Manicure" service to my cart
Then I should see my cart showing 2 item added

When I click on the "Pay" button
Then I should see the text "Payment Ticket" visible
And I should see the text "Payment History" visible
And I should see the button with id "payment" visible

When I click on the element with id "payment"
And I should see a popup dialog with title "Close Ticket"
And I should see a popup dialog with content "CHANGE$0.00OK"
When I click on the "OK" button in the popup dialog
Then I should be redirected to HOME page


