@slow @regression @smoke
Feature: Quick sale tickets

  Scenario: Create a quick sale ticket
    Given I am on the HOME page
    When I navigate to "Quick Sale" on the navigation bar
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    And I should see the user info "Christ" in the ticket

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Kelley" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Kelley" employee in my cart

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "10" from the numpad
    Then I should see "$10.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the employee "Christ" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "10" visible in the split tip screen

    When I click on the "Equal Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

