@slow @regression @smoke
Feature: Create tickets

  Scenario: Display the default loyalty program and loyalty program list when adding a new customer
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0917"
    Then I should see the employee "Dylan" in the employee list
    When I select the "Dylan" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the Select customer
    And I click on the "CLICK HERE TO ADD CUSTOMER" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible
    And I should see the loyalty program list displayed correctly

  Scenario: Card fee is calculated correctly for cash discounts
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0917"
    Then I should see the employee "Dylan" in the employee list
    When I select the "Dylan" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the card price amount "$6.18" visible
    And I should see the cash price amount "$6.00" visible

  Scenario: Display correct category and service data
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0917"
    Then I should see the employee "Dylan" in the employee list
    When I select the "Dylan" employee
    Then I should see the "Ticket View" screen
    And I should see the categories displayed correctly in ticket view

    When I select the "MANI & PEDI" category
    Then I should see all services in the first category displayed correctly
    When I select the "FULL SET & FILL IN" category
    Then I should see all services in the second category displayed correctly
    When I select the "ADDITIONAL SERVICE" category
    Then I should see all services in the third category displayed correctly
    When I select the "GIFT CARD" category
    Then I should see all services in the fourth category displayed correctly

  Scenario: Create a ticket then pay by Cash
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

  @skip
  Scenario: Add an existing customer to a new ticket and pay with Loyalty points
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8102"
    Then I should see the employee "Tim" in the employee list
    When I select the "Tim" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I wait for the page fully loaded
    And I add the "Tin" customer
    Then I should see a new customer "Tin" on ticket

    When I click on the "PAY" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the text "BALANCE" visible

    When I redeem my loyalty points
    Then I should be redirected to HOME page

  Scenario: Create a new customer on the fly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0917"
    Then I should see the employee "Dylan" in the employee list
    When I select the "Dylan" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the Select customer
    And I click on the "CLICK HERE TO ADD CUSTOMER" button
    Then I should see a popup dialog with title "Create New Customer"

    When I fill the new customer name "Guest"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Guest" on ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Create a ticket with multiple technicians
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2860"
    Then I should see the employee "Tina" in the employee list
    When I select the "Tina" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

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

  Scenario: Create a ticket, add Tip and pay with Credit card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0101"
    Then I should see the employee "Laura" in the employee list
    When I select the "Laura" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the card price amount "$11.18" visible
    And I should see the cash price amount "$11.00" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Verify that the balance is updated correctly when paying with a gift card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0404"
    Then I should see the employee "Emma" in the employee list
    When I select the "Emma" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1403"
    And I click on the "CHECK BALANCE" button
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    Given I am on the GIFT_CARD_BALANCE page
    When I enter the amount "1403"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded

    Then I should see the text "DETAILS" visible
    And I should see the first date is today in the gift card detail list
    And I should see the first type "Redeem" in the gift card detail list
    And I should see the first amount "($6.00)" in the gift card detail list

  Scenario: Create a ticket and pay with Zelle type
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0505"
    Then I should see the employee "Hanna" in the employee list
    When I select the "Hanna" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible

    When I select the "Zelle" payment type
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Split tip by Percent on ticket after paying by Credit card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0202"
    Then I should see the employee "Brian" in the employee list
    When I select the "Brian" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Kelley" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Kelley" employee in my cart

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

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
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

  Scenario: Create a ticket and pay with Cash change
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9076"
    Then I should see the employee "Kim" in the employee list
    When I select the "Kim" employee
    Then I should see the "Ticket View" screen
    And I should see the "Gel removal" service

    When I add the "Gel removal" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I enter the amount "100"
    And I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$60.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Make multiple payments using Gift Card and Credit
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1219"
    Then I should see the employee "Lisa" in the employee list
    When I select the "Lisa" employee
    Then I should see the "Ticket View" screen
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "CHECK BALANCE" button
    Then I should see the "AMOUNT" name
    When I select the title "AMOUNT"
    And I enter the amount "10"
    And I click on the element with id "payment"
    Then I should see the payment history "Gift (1111)" visible
    And I should see the payment price "$10.00"

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Change price and add note for service in ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1828"
    Then I should see the employee "Harry" in the employee list
    When I select the "Harry" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "10"
    And I change the quantity to "2"
    And I enter a note "Lorem Ipsum"
    Then I should see the total price "$20.00" visible
    And I should see the note "Lorem Ipsum" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Add the Open Discount amount for Discount item
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8623"
    Then I should see the employee "Bella" in the employee list
    When I select the "Bella" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I wait for the page fully loaded
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the item "DISCOUNT ITEM" button
    Then I should see a popup dialog with title "DISCOUNT MULTIPLE"
    When I select the "Manicure" service in the dialog
    Then I should see the "Owner Absorbs" option is checked

    When I select the discount "Open Discount"
    And I select the type "Amount" option
    Then I should see the discount type "Amount" visible
    When I enter the discount amount "3"
    And I click on the "Add Value" button in the popup dialog
    And I click on the "Apply" button in the popup dialog
    Then I should see the "Open Discount" discount in my cart
    And I should see the "Owner Absorbs" absorption type in my cart
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

  Scenario: Add the Open Discount percent for Discount ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9962"
    Then I should see the employee "Ruby" in the employee list
    When I select the "Ruby" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the adding "Discount" button
    Then I should see a popup dialog with title "Discount Ticket"
    And I should see the "Owner Absorbs" option is checked

    When I select the discount "Open Discount"
    Then I should see the discount type "Percent" visible
    When I enter the discount percent "10"
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

  Scenario: Sell a Gift Card add-on amount
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1010"
    Then I should see the employee "Tom" in the employee list
    When I select the "Tom" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $100" service
    When I add the "Gift card $100" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "1234"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "1234" visible
    When I click on the "ADD ON" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the service "Gift card $100 (1234)" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    Given I am on the GIFT_CARD_BALANCE page
    When I enter the amount "1234"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "DETAILS" visible
    And I should see the first date is today in the gift card detail list
    And I should see the first type "ActivateAddOn" in the gift card detail list
    And I should see the first amount "$100.00" in the gift card detail list

  Scenario: Sell a Gift Card rewrite amount
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5362"
    Then I should see the employee "Sandy" in the employee list
    When I select the "Sandy" employee
    Then I should see the "Ticket View" screen
    And I should see the "GIFT CARD" category

    When I select the "GIFT CARD" category
    Then I should see the "Gift card $100" service
    When I add the "Gift card $100" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "4321"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "4321" visible
    When I click on the "REWRITE" button in the popup dialog
    Then I should see my cart showing 1 item added
    And I should see the service "Gift card $100 (4321)" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    Given I am on the GIFT_CARD_BALANCE page
    When I enter the amount "4321"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "DETAILS" visible
    And I should see the first date is today in the gift card detail list
    And I should see the first type "Overwrite" in the gift card detail list
    And I should see the first amount "$100.00" in the gift card detail list

  Scenario: Remove tax in ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6993"
    Then I should see the employee "Jack" in the employee list
    When I select the "Jack" employee
    And I select the "FULL SET & FILL IN" category
    And I add the "Taxable" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the tax amount non-zero

    When I remove the tax
    Then I should see the tax display "$0.00"

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Void an empty ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0727"
    Then I should see the employee "Kelley" in the employee list
    When I select the "Kelley" employee
    Then I should see the "Ticket View" screen

    When I wait for the page fully loaded
    And I void the current open ticket with reason "Mistake"
    Then I should be redirected to HOME page

  Scenario: Void a ticket with a service in Done status
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0727"
    Then I should see the employee "Kelley" in the employee list
    When I select the "Kelley" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "Manicure" service with status wait

    When I click the status of "Manicure" to change done
    Then I should see the "Manicure" service with status done

    When I void the current open ticket with reason "Mistake"
    Then I should be redirected to HOME page

  Scenario: Void a ticket with a service in Wait status
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0727"
    Then I should see the employee "Kelley" in the employee list
    When I select the "Kelley" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I wait for the page fully loaded
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "Manicure" service with status wait

    When I void the current open ticket with reason "Mistake"
    Then I should be redirected to HOME page

  Scenario: Combine tickets
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6310"
    Then I should see the employee "Sarah" in the employee list

    When I select the "Sarah" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see the service "Manicure" in my cart

    When I back to HOME page
    And I wait for the page fully loaded
    Then I should see the employee "Maya" in the employee list
    When I select the "Maya" employee
    Then I should see the "Ticket View" screen
    And I should see the "Pedicure" service
    When I add the "Pedicure" service to my cart
    Then I should see the service "Pedicure" in my cart

    When I click on the item "COMBINE TICKET" button
    Then I should see a popup dialog with title "Combine Ticket"
    When I click on the "Sarah" text inside the content section of the opening dialog
    And I click on the "Combine Ticket" button in the popup dialog
    Then I should see a second popup dialog with title "Confirm Combine Ticket"
    When I click on the "confirm" button in the popup dialog

    Then I should see my cart showing 2 item added
    And I should see the service "Manicure" in my cart
    And I should see the employee "Sarah" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Void the item when creating a ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0404"
    Then I should see the employee "Sam" in the employee list

    When I select the "Sam" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    And I add the "Cut cuticle" service to my cart
    Then I should see my cart showing 2 item added
    And I should see the service "Manicure" in my cart
    And I should see the service "Cut cuticle" in my cart

    When I click the status of "Manicure" to change done
    Then I should see the "Manicure" service with status done

    When I click on the item "VOID ITEM" button
    Then I should see a popup dialog with title "VOID MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the reason "Mistake"
    And I click on the "Void Items" button in the dialog
    Then I should not see the service "Manicure" in my cart
    And I should see my cart showing 1 item added

    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added
    And I should see the service "Pedicure" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Change Technician for Service package
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6769"
    Then I should see the employee "Sophia" in the employee list

    When I select the "Sophia" employee
    Then I should see the "Ticket View" screen
    And I should see the "Combo 1" service

    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see multiple "Sophia" employees in my cart
    And I should see the employee "Sophia" for all items in a package in my cart

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

  Scenario: Remove payment history and choose another one
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6373"
    Then I should see the employee "Mia" in the employee list

    When I select the "Mia" employee
    Then I should see the "Ticket View" screen
    And I should see the "Combo 1" service

    When I add the "Combo 1" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the service "Manicure" in my cart
    And I should see the service "Pedicure" in my cart
    And I should see multiple "Mia" employees in my cart
    And I should see the employee "Mia" for all items in a package in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I enter the amount "10"
    And I click on the element with id "payment"
    Then I should see the payment history "Cash" visible
    And I should see the payment price "$10.00"

    When I click on the more menu for payment history of "Cash"
    Then I should see the tooltip remove
    When I click on the tooltip remove
    Then I should see a popup dialog with title "Cash  - $10.00"
    When I click on the "Remove" button in the popup dialog
    Then I should see the text "No transactions found." in the payment history

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "1111"
    And I click on the "CHECK BALANCE" button
    Then I should see the "AMOUNT" name
    When I select the title "AMOUNT"
    And I enter the amount "10"
    And I click on the element with id "payment"
    Then I should see the payment history "Gift (1111)" visible
    And I should see the payment price "$10.00"

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

  Scenario: Update the user info when changing technician
    Given I am on the HOME page
    When I clock in the timesheet with PIN "2406"
    Then I should see the employee "Madison" in the employee list

    When I select the "Madison" employee
    Then I should see the "Ticket View" screen
    And I should see the user info "Madison" in the ticket
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I add the "Pedicure" service to my cart
    Then I should see the service "Pedicure" in my cart

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Pedicure" service in the dialog
    And I select the "Anna" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Anna" employee in my cart

    When I click on the remove item service "Manicure"
    Then I should not see the service "Manicure" in my cart
    And I should see the user info "Anna" in the ticket

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Select Tech to split tip by percent
    Given I am on the HOME page
    When I clock in the timesheet with PIN "3030"
    Then I should see the employee "Kayla" in the employee list
    When I select the "Kayla" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    When I add the "Pedicure" service to my cart
    When I add the "Cut cuticle" service to my cart
    Then I should see my cart showing 3 item added

    When I click on the item "Technician" button
    Then I should see a popup dialog with title "TECHNICIAN MULTIPLE"
    When I select the "Manicure" service in the dialog
    And I select the "Kelley" employee in the dialog
    And I select the "Pedicure" service in the dialog
    And I select the "Savannah" employee in the dialog
    And I click on the "Apply" button in the dialog
    Then I should see the "Kelley" employee in my cart
    And I should see the "Savannah" employee in my cart

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should see the employee "Kayla" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the employee "Savannah" visible in the split tip screen
    And I should see the text "TOTAL TIP" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Select Techs" button in the split tip screen
    And I select the employee "Kayla" in the split tip screen
    And I select the employee "Savannah" in the split tip screen
    And I click on the "Percent Split" button in the split tip screen
    Then I should see the split tips amount for employee "Kayla" is non-zero
    And I should see the split tips amount for employee "Savannah" is non-zero
    And I should see the split tips amount for employee "Kelley" is zero
    When I click on the "CLOSE TICKET" button
    Then I should be redirected to HOME page

  Scenario: Cannot pay more than the Gift card Balance
    Given I am on the HOME page
    When I clock in the timesheet with PIN "4040"
    Then I should see the employee "Aubrey" in the employee list
    When I select the "Aubrey" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the total price of "Manicure"
    Then I should see a popup dialog with title "Service: Manicure - $6.00"
    When I change the price to "35.7"
    And I click on the "Save" button in the popup dialog
    Then I should see the total price "$35.70" visible

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible

    When I select the "Gift" payment type
    Then I should see the "ID GIFT CARD" name
    When I fill the Gift card with "20"
    And I click on the "CHECK BALANCE" button
    And I click on the element with id "payment"
    And I click on the element with id "payment"
    Then I should see the toast message "Gift Card #20 does not have enough funds to pay" visible

    When I select the "Cash" payment type
    And I click on the element with id "payment"
    Then I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I search for "35.7"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$35.70"

    When I click on the first row for payment "$35.70" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Aubrey" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page

  Scenario: Select service to change technician
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8226"
    Then I should see the employee "Lauren" in the employee list

    When I select the "Lauren" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I select the "Manicure" service in my cart
    Then I should see a popup dialog with title "Change Technician"
    When I click on the "Addison" text inside the content section of the opening dialog
    Then I should see the employee "Addison" in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the button with id "payment" visible

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Add the Discount ticket while paying
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6512"
    Then I should see the employee "Jasmine" in the employee list
    When I select the "Jasmine" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "PAY" button
    And I click on the function "DISCOUNT" payment
    Then I should see a popup dialog with title "Add Discount Ticket"
    And I should see the "Owner Absorbs" option is checked

    When I select the discount "Open Discount"
    Then I should see the discount type "Percent" visible
    When I enter the discount percent "10"
    And I click on the "Add" button in the popup dialog
    Then I should see the discount ticket non-zero

    When I click on the element with id "payment"
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should be redirected to HOME page

  Scenario: Show earning today
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0074"
    Then I should see the employee "Paige" in the employee list
    When I select the "Paige" employee
    Then I should see the "Ticket View" screen
    And I should see the "Gel removal" service

    When I add the "Gel removal" service to my cart
    Then I should see my cart showing 1 item added
    When I add the "Cut cuticle" service to my cart
    Then I should see my cart showing 2 item added

    When I click on the adding "Tip" button
    Then I should see a popup dialog with title "Add Tip"
    When I fill "5" from the numpad
    Then I should see "$5.00" tip in my cart

    When I click on the "PAY" button
    Then I should see the text "PAYMENT TICKET" visible
    And I should see the text "PAYMENT HISTORY" visible
    And I should see the card price amount "$56.50" visible
    And I should see the cash price amount "$55.00" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the element with id "payment"
    Then I should be redirected to HOME page

    When I click to show earning today
    And I enter the password "0074"
		And I wait for the page fully loaded
    Then I should see a popup dialog with title "Paige Earnings Today"
    And I should see the text "COMMISSION $29.40" on the dialog
    And I should see the text "TOTAL SALES $50.00" on the dialog
    And I should see the text "TOTAL NON-CASH TIPS $5.00" on the dialog
    And I should see the text "NET TOTAL SALES $49.00" on the dialog
    When I click on the action button "OK" of the opening dialog

    When I navigate to "Tickets" on the navigation bar
    Then I should be redirected to CLOSED_TICKETS page

    When I click on refresh
    Then I should see the toast message "Ticket data refreshed successfully." visible
    When I wait for the page fully loaded
    And I search for "56.50"
    And I wait for the page fully loaded
    Then I should see the first ticket of payment "$56.50"

    When I click on the first row for payment "$56.50" to expand details
    Then I should see the "Reopen ticket" button visible

    When I click on the "Reopen ticket" button
    And I wait for the page fully loaded
    Then I should see the "Ticket View" screen
    And I should see the user info "Paige" in the ticket

    When I void the current open ticket with reason "System Test"
    Then I should be redirected to HOME page
