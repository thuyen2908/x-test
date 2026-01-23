@slow @regression @smoke
Feature: Refund

  Scenario: Create a refund ticket and pay with Cash
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6876"
    Then I should see the employee "Christ" in the employee list
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Refund" label in the menu list
    And I wait for the page fully loaded
    Then I should see a popup dialog with title "Create Ticket Refund"
    And I should see the employee "Christ" in the popup dialog
    And I should see the "Add Commission" option is checked

    When I enter the amount "10"
    And I click on the "OK" button
    Then I should see the text "Ticket View" visible
    And I should see the user info "Christ" in the ticket
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    And I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page


