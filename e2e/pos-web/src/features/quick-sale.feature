@slow @regression @smoke
Feature: Quick sale tickets

  Scenario: Create a quick sale ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6876"
    Then I should see the employee "Christ" in the employee list
    When I wait for the page fully loaded
    And I navigate to "Quick Sale" on the navigation bar
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    And I should see the user info "Christ" in the ticket

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

