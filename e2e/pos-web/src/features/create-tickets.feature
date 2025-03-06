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
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @slow
  Scenario: Add an existing customer to a new ticket and pay with Loyalty points
    Given I am on the HOME page
    When I select the "Tim" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I add the "Tin" customer
    Then I should see a new customer "Tin" on ticket

    When I click on the "Pay" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the text "BALANCE" visible

    When I redeem my loyalty points
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a new customer on the fly
    Given I am on the HOME page
    When I select the "Dylan" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Guest"
    And I fill the new customer phone
    And I click on the "Save" button in the popup dialog
    Then I should see a new customer "Guest" on ticket

    When I click on the "Pay" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket with multiple technicians
    Given I am on the HOME page
    When I select the "Tina" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added
    And I should see the tax amount non-zero

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
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket, add Tip and pay with Credit card
    Given I am on the HOME page
    When I select the "Laura" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "5" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket and pay with Gift Card type
    Given I am on the HOME page
    When I select the "Emma" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "Check Balance" button
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  @slow
  Scenario: Create a ticket and pay with Zelle type
    Given I am on the HOME page
    When I select the "Hanna" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Zelle" payment type
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  @slow
  Scenario: Split tip on ticket after paying by Credit card
    Given I am on the HOME page
    When I select the "Brian" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added
    And I should see the tax amount non-zero

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Kelley" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Kelley" employee in my cart

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "5" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the employee "Brian" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero

    When I click on the "Close Ticket" button
    Then I should see a popup dialog with title "Close Ticket"
    When I click on the "confirm" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Create a ticket and pay with Cash change
    Given I am on the HOME page
    When I select the "Laura" employee
    Then I should see the "Ticket View" screen
    And I should see the "Gel Removal" service

    When I add the "Gel Removal" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I enter the amount "100"
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$57.60OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Make multiple payments using Gift Card and Credit
    Given I am on the HOME page
    When I select the "Laura" employee
    Then I should see the "Ticket View" screen
    And I should see the "Acrylic Removal" service

    When I add the "Acrylic Removal" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "Check Balance" button
    And I enter the amount "10"
    And I click on the element with id "payment"
    Then I should see the payment history "Gift" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  @skip
  Scenario: Change price and add note for service in ticket
    Given I am on the HOME page
    When I select the "Lisa" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the total price of "Manicure"
    Then I should see a popup dialog contain title "Service"
    When I change the price to "10"
    And I change the quantity to "2"
    And I enter a note "Lorem Ipsum"
    And I click on the "OK" button in the dialog
    Then I should see the total price as "20"
    And I should see the note "Lorem Ipsum" displayed

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Add the Open Discount amount for Discount item
    Given I am on the HOME page
    When I select the "Lisa" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the item "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT MULTIPLE"
    When I select the "Manicure" service in the dialog
    Then I should see the "Owner Absorbs" is checked

    When I select the discount "Open Discount"
    And I select the discount type "Amount"
    Then I should see the discount type "Amount" visible
    When I enter the discount amount "3"
    And I click on the "Add Value" button in the popup dialog
    And I click on the "OK" button in the popup dialog
    Then I should see "Open Discount" in my cart
    And I should see discount "$3.00" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Add the Open Discount percent for Discount ticket
    Given I am on the HOME page
    When I select the "Lisa" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the adding "Discount" button
    Then I should see a popup dialog with title "Add Discount Ticket"
    And I should see the "Owner Absorbs" is checked

    When I select the discount "Open Discount"
    Then I should see the discount type "Percent" visible
    When I enter the discount amount "10"
    And I click on the "Add" button in the popup dialog
    Then I should see the discount ticket non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Sell a Gift Card add-on amount
    Given I am on the HOME page
    When I select the "Kelley" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I select the "GIFT CARD" category
    Then I should see the "Gift Card $100" service
    When I select the "Gift Card $100" service
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "1234"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "1234" visible
    When I click on the "ADD ON" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  @skip
  Scenario: Sell a Gift Card rewrite amount
    Given I am on the HOME page
    When I select the "Kelley" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I select the "GIFT CARD" category
    Then I should see the "Gift Card $100" service
    When I select the "Gift Card $100" service
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "4321"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "1234" visible
    When I click on the "REWRITE" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page
