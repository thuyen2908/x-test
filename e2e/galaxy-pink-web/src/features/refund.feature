@slow @regression @smoke
Feature: Refund

  Scenario: Create a refund ticket and pay with Cash
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the functions
    And I select the "Refund" on the Daily Task
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

    When I click on the "Pay" button
    And I select the "Cash" payment type
    Then I should see the payment history "Cash ($16.00)" visible

    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page


