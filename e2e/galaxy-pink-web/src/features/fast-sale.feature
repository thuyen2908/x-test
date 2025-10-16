@slow @regression @smoke
Feature: Fast Sale tickets

  Scenario: Create a fast sale ticket
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I navigate to "FAST SALE" on the navigation bar
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    And I should see the user info "Christ" in the ticket

    When I add the "Manicure" service to my cart
    And I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I select the service "Manicure" in my cart
    And I select the "Kelley" employee in the list item employee
    Then I should see the employee "Kelley" in my cart

    When I click on the adding "Tip" button
    And I fill "10" from the numpad
    Then I should see "Tip $10.00" in my cart

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$14.42 + $10.00" visible

    When I click on the "SPLIT TIP" button
    Then I should see the employee "Christ" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the total tip "10" visible in the split tip screen

    When I click on the "Equal Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

