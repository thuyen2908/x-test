@regression @smoke
Feature: Create tickets

  @slow
  Scenario: Create a ticket without any complex action
    Given I am on the HOME page
    When I clock in the timesheet
    Then I should see the employee "Owner" in the employee list

    When I select the "Owner" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
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
