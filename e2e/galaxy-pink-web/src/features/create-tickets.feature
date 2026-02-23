@slow @regression @smoke
Feature: Create tickets

  Scenario: Display the default loyalty program and loyalty program list when adding a new customer
    Given I am on the HOME page
    When I clock in the timesheet with PIN "4831"
    Then I should see the employee "Calantha" in the employee list
    When I select the "Calantha" employee
    And I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible
    And I should see the loyalty program list displayed correctly

  Scenario: Card fee is calculated correctly for cash discounts
    Given I am on the HOME page
    When I clock in the timesheet with PIN "5254"
    Then I should see the employee "Charlene" in the employee list
    When I select the "Charlene" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    Then I should see the card price amount "$0.18/$6.18" visible
    And I should see the cash price amount "$6.00" visible

    When I click on the "Cancel" button
    And I click on the "Void Ticket" button
    And I select the reason "Mistake"
    Then I should see a popup dialog with title "Confirm Void"
    When I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I click on the "Void Ticket" button
    And I select the reason "Mistake"
    Then I should see a popup dialog with title "Confirm Void"
    When I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Create a ticket then pay by Cash
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1234"
    Then I should see the employee "Owner" in the employee list

    When I select the "Owner" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service
    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Manicure" in my cart
    And I change price amount "6.11"
    And I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded

    When I search for "6.11"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$6.11"

    When I void ticket with payment amount "$6.11"
    Then I should see the selected "SERVICE" tab on the Home page
    And I should not see the employee "Owner" in the ticket list

  Scenario: Update redeem after paying with Loyalty points
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8102"
    Then I should see the employee "Tim" in the employee list
    When I select the "Tim" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I wait for the page fully loaded
    And I add the phone number customer "5555555555"
    Then I should see a new customer "Bonnie" on ticket

    When I click on the "Pay" button
    Then I should see a popup dialog with title "Reward"
    When I click on the "OK" button in the popup dialog
    Then I should see the text "BALANCE" visible

    When I redeem my loyalty points
    Then I should see the text "Current:" visible
    And I should see the text points used "Points Used: (600) pts" visible
    When I click on the "OK" button
    Then I should see the payment history "Loyalty (600 pts)$6.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    Given I am on the GIFT_CARD_BALANCE page
    When I click on the "LOYALTY" button
    When I enter the amount "5555555555"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded

    #Then I should see the text "Customer: Bonnie" visible
    Then I should see the first date is today in the loyalty detail list
    And I should see the first type "Issuance" in the loyalty detail list
    And I should see the first amount "0" in the gift card detail list

  Scenario: Create a new customer on the fly
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0917"
    Then I should see the employee "Dylan" in the employee list
    When I select the "Dylan" employee
    And I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the Select customer
    And I click on the "Click Here To Add Customers" button
    Then I should see a popup dialog with title "Create New Customer"
    And I should see the loyalty program "2 Points = $1" visible

    When I fill the new customer name "Guest"
    And I fill the new customer phone
    And I click on the "SAVE" button in the create new customer dialog
    Then I should see a new customer "Guest" on ticket

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Pedicure" in my cart
    Then I should see the ticket function menu
    When I select the "Anna" employee in the list item employee
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the group "Nails"
    Then I should see the "Anna" employee in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Create a ticket, add Tip and pay with Credit card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0101"
    Then I should see the employee "Laura" in the employee list
    When I select the "Laura" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I add tip amount "5"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$6.18 + $5.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Verify that the balance is updated correctly when paying with a gift card
    Given I am on the HOME page
    When I clock in the timesheet with PIN "4"
    Then I should see the employee "Emma" in the employee list
    When I select the "Emma" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    And I select the "Gift" payment type
    And I fill the last 4 digits of card number "1403"
    And I click on search
    And I wait for the page fully loaded
    And I click on the "OK" button
    And I wait for the page fully loaded
    Then I should see the payment Gift history "Gift (1403) $6.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

    Given I am on the GIFT_CARD_BALANCE page
    When I enter the amount "1403"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded

    Then I should see the first date is today in the gift card detail list
    And I should see the first type "Redeem" in the gift card detail list
    And I should see the first amount "($6.00)" in the gift card detail list

  Scenario: Create a ticket and pay with Debit type
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0505"
    Then I should see the employee "Hanna" in the employee list
    When I select the "Hanna" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    And I select the "Debit" payment type
    And I fill the last 4 digits of card number "1234"
    And I click on the "OK" button
    Then I should see the payment history "DEBIT (1234)$6.00" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Manicure" in my cart
    And I select the "Kelley" employee in the list item employee
    Then I should see the "Kelley" employee in my cart

    When I add tip amount "5"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$14.42 + $5.00" visible

    When I click on the "SPLIT TIP" button
    Then I should see the employee "Brian" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Percent Split" button in the split tip screen
    Then I should see all split tips non-zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Create a ticket and pay with Cash change
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9076"
    When I select the "Kim" employee
    Then I should see the "Ticket View" screen
    And I should see the "Gel removal" service

    When I add the "Gel removal" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    And I enter the amount "100"
    And I select the "Cash" payment type
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$60.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Make multiple payments using Gift Card and Credit
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1219"
    Then I should see the employee "Lisa" in the employee list

    When I select the "Lisa" employee
    Then I should see the "Ticket View" screen
    And I should see the "Acrylic removal" service

    When I add the "Acrylic removal" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    And I enter the amount "10"
    And I select the "Gift" payment type
    And I fill the last 4 digits of card number "1111"
    And I click on search
    And I wait for the page fully loaded
    And I click on the "OK" button
    Then I should see the payment Gift history "Gift (1111) $10.00" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$20.60" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Change price and add request for service in ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "1828"
    Then I should see the employee "Harry" in the employee list
    When I select the "Harry" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Manicure" in my cart
    And I change price amount "20"

    When I select the service "Manicure" in my cart
    And I select the "REQUEST" on the menu
    And I enter a note "Lorem Ipsum"
    And I click on the "OK" button
    Then I should see the note "Lorem Ipsum" visible

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Manicure" in my cart
    And I select the "DISCOUNT ITEM" on the menu
    Then I should see the "Original Price (Owner)" option is active

    When I select the discount "Open Discount"
    Then I should see the "Amount" discount type is active
    When I enter the amount "3"
    And I click on the "OK" button
    Then I should see the "Open Discount (Original Price)" discount in my cart
    And I should see discount "($3.00)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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
    Then I should see the "Original Price (Owner)" option is active

    When I select the discount absorb type "Discounted Price (Technician)"
    Then I should see the "Discounted Price (Technician)" option is active

    When I select the discount "Open Discount"
    And I select the "Percent" discount type
    Then I should see the "Percent" discount type is active

    When I enter the amount "10"
    And I click on the "OK" button
    Then I should see the discount ticket detail "Open Discount 10% (Discounted Price)($0.60)" in my cart
    And I should see "Discount ($0.60)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Apply auto-discount item and change it to another
    Given I am on the HOME page
    When I clock in the timesheet with PIN "9960"
    Then I should see the employee "Brielle" in the employee list
    When I select the "Brielle" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I wait for the page fully loaded
    And I select the "ADDITIONAL SERVICE" category
    And I add the "Ombre" service to my cart
    Then I should see my cart showing 1 item added
    And I should see the "$3 Off (Original Price)" discount in my cart
    And I should see discount "($3.00)" in my cart

    When I select the service "Ombre" in my cart
    And I change price amount "38.4"

    When I select the service "Ombre" in my cart
    And I select the "DISCOUNT ITEM" on the menu
    Then I should see a popup dialog with title "DISCOUNT"
    When I select the change charge action "Change Discount"
    And I select the discount "$5 Off"
    Then I should see the "$5 Off (Original Price)" discount in my cart
    And I should see discount "($5.00)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I wait for the page fully loaded
    And I navigate to "Balance" on the navigation bar
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card / Loyalty Balance" visible

    When I enter the amount "1234"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "Activity History" visible
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

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I wait for the page fully loaded
    And I navigate to "Balance" on the navigation bar
    Then I should be redirected to GIFT_CARD_BALANCE page
    And I should see the text "Gift Card / Loyalty Balance" visible

    When I enter the amount "4321"
    And I click on the "SEARCH" button
    And I wait for the page fully loaded
    Then I should see the text "Activity History" visible
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
    And I should see "Tax $0.96" in my cart

    When I click on the adding "Tax" button
    Then I should see a popup dialog with title "TAX"
    When I select the change charge action "Remove Tax"
    Then I should see "Tax $0.00" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Void an empty ticket
    Given I am on the HOME page
    When I clock in the timesheet with PIN "0727"
    Then I should see the employee "Kelley" in the employee list
    When I select the "Kelley" employee
    Then I should see the "Ticket View" screen

    When I wait for the page fully loaded
    And I click on the "Void Ticket" button
    And I select the reason "Mistake"
    And I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I click on the "Void Ticket" button
    And I select the reason "Mistake"
    And I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I click on the "Void Ticket" button
    And I select the reason "Mistake"
    And I click on the "confirm" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Combine tickets
    Given I am on the HOME page
    When I clock in the timesheet with PIN "4857"
    Then I should see the employee "Eira" in the employee list

    When I select the "Eira" employee
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

    When I click on the "Combine" button on the header
    And I select the "Eira" employee in the list item employee
    And I click on the "OK" button

    Then I should see my cart showing 2 item added
    And I should see the service "Manicure" in my cart
    And I should see the employee "Eira" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

    When I wait for the page fully loaded
    Then I should not see the employee "Eira" in the ticket list
    And I should not see the employee "Maya" in the ticket list

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

    When I select the service "Manicure" in my cart
    And I select the "Void Item" on the menu
    And I select the reason "Mistake"
    Then I should not see the service "Manicure" in my cart
    And I should see my cart showing 1 item added

    When I add the "Pedicure" service to my cart
    Then I should see my cart showing 2 item added
    And I should see the service "Pedicure" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Manicure" in my cart
    And I select the "Anna" employee in the list item employee
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the change charge action "Nails"

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I click on the "Pay" button
    And I enter the amount "10"
    And I select the "Cash" payment type
    Then I should see the payment history "Cash $10.00" visible

    When I select the payment history "Cash $10.00"
    Then I should see a popup dialog with title "Cash  - $10.00"
    When I click on the "Remove" button in the popup dialog
    And I enter the amount "10"
    And I select the "Gift" payment type
    And I enter the amount "1111"
    And I click on search
    And I wait for the page fully loaded
    And I click on the "OK" button
    And I wait for the page fully loaded
    Then I should see the payment Gift history "Gift (1111) $10.00" visible

    When I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$36.05" visible
    When I click on the "Close Ticket" button
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Pedicure" in my cart
    And I select the "Anna" employee in the list item employee
    Then I should see a popup dialog with title "SELECT TURN GROUP"
    When I select the group "Nails"
    Then I should see the "Anna" employee in my cart

    When I select the service "Manicure" in my cart
    And I select the "VOID ITEM" on the menu
    Then I should not see the service "Manicure" in my cart
    And I should see the user info "Anna" in the ticket

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

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

    When I select the service "Manicure" in my cart
    And I select the "Kelley" employee in the list item employee
    And I select the service "Pedicure" in my cart
    And I select the "Savannah" employee in the list item employee
    Then I should see the "Kelley" employee in my cart
    And I should see the "Savannah" employee in my cart

    When I add tip amount "5"

    When I click on the "Pay" button
    And I select the "Credit" payment type
    And I fill the last 4 digits of card number "1234"
    And I select the "VISA" on the menu
    Then I should see the payment history "VISA (1234)$24.72 + $5.00" visible

    When I click on the "SPLIT TIP" button
    Then I should see the employee "Kayla" visible in the split tip screen
    And I should see the employee "Kelley" visible in the split tip screen
    And I should see the employee "Savannah" visible in the split tip screen
    And I should see the total tip "5" visible in the split tip screen

    When I click on the "Select Techs" button in the split tip screen
    And I select the employee "Kayla" in the split tip screen
    And I select the employee "Savannah" in the split tip screen
    And I click on the "Percent Split" button in the split tip screen
    Then I should see the split tips amount for employee "Kayla" is non-zero
    And I should see the split tips amount for employee "Savannah" is non-zero
    And I should see the split tips amount for employee "Kelley" is zero
    When I click on the "OK" button
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: Cannot pay more than the Gift card Balance
    Given I am on the HOME page
    When I clock in the timesheet with PIN "4040"
    Then I should see the employee "Aubrey" in the employee list
    When I select the "Aubrey" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I select the service "Manicure" in my cart
    And I change price amount "35.71"

    When I click on the "Pay" button
    And I enter the amount "2020"
    And I select the "Gift" payment type
    And I enter the amount "2020"
    And I click on search
    Then I should see the gift card balance "$20.00" visible
    When  I wait for the page fully loaded
    And I click on the "OK" button
    And I wait for the page fully loaded
    Then I should see the payment Gift history "Gift (2020) $20.00" visible

    When I select the "Gift" payment type
    And I enter the amount "2020"
    And I click on search
    And I wait for the page fully loaded
    Then I should see the card value "$20.00" visible

    When I click on the "OK" button
    Then I should see the toast message "Gift Card #2020 does not have enough funds to pay." visible

    When I click on the "Cancel" button
    And I wait for the page fully loaded
    And I select the "Cash" payment type
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page

    When I select the "CLOSED TICKET" tab
    And I wait for the page fully loaded

    When I search for "35.71"
    And I wait for the page fully loaded
    Then I should see the last ticket of payment "$35.71"

    When I void ticket with payment amount "$35.71"
    Then I should see the selected "SERVICE" tab on the Home page
    And I should not see the employee "Aubrey" in the ticket list

  Scenario: Add the Discount ticket while paying
    Given I am on the HOME page
    When I clock in the timesheet with PIN "6512"
    Then I should see the employee "Jasmine" in the employee list
    When I select the "Jasmine" employee
    Then I should see the "Ticket View" screen
    And I should see the "Manicure" service

    When I add the "Manicure" service to my cart
    Then I should see my cart showing 1 item added

    When I click on the "Pay" button
    And I click on the function "DISCOUNT" payment
    Then I should see the "Original Price (Owner)" option is active

    When I select the discount "10% Off"
    Then I should see the discount ticket detail "10% Off (Original Price)($0.60)" in my cart

    When I pay the exact amount by "Cash"
    Then I should see the selected "SERVICE" tab on the Home page

  Scenario: No cash discount is charged when selling GC
    Given I am on the HOME page
    When I clock in the timesheet with PIN "8903"
    Then I should see the employee "Keelin" in the employee list
    When I select the "Keelin" employee
    And I add the "Manicure" service to my cart
    When I select the "GIFT CARD" category
    And I add the "Gift card $100" service to my cart
    Then I should see a popup dialog with title "Activate Gift Card $100.00"

    When I enter the amount "4321"
    And I click on the "OK" button in the popup dialog
    Then I should see the number card "4321" visible
    When I click on the "REWRITE" button in the popup dialog
    Then I should see the service "Gift card $100 (4321)" in my cart
    And I should see my cart showing 2 item added

    When I click on the "Pay" button
    Then I should see the card price amount "$0.18/$106.18" visible
    And I should see the cash price amount "$106.00" visible

    When I select the "Cash" payment type
    Then I should see a popup dialog with title "Close Ticket"
    And I should see a popup dialog with content "CHANGE$0.00OK"
    When I click on the "OK" button in the popup dialog
    Then I should see the selected "SERVICE" tab on the Home page
