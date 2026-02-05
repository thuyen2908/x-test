@regression @slow @page
Feature: Discounts management

  Scenario: View the Discounts management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Discounts" label in the expanded list
    Then I should be redirected to DISCOUNT page
    And I should see the "Discounts" screen

  Scenario: Create a new Discount
   Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Discounts" label in the expanded list
    Then I should be redirected to DISCOUNT page
    And I should see the "Discounts" screen
    When I click on the "Refresh" button
    And I wait for the page fully loaded
    When I click on the "Add New" button
    Then I should be redirected to DISCOUNT_CREATE page
    And I should see the "Create Discount" screen
    When I fill the "Discount name" field with value "Auto Discount"
    And I fill the "DisplayDC" field with value "Auto Discount Display"
    And I fill the "Amount Discount" field with value "50"
    And I Select the Discount method "Percent"
    When I click on the "Save" button
    And I wait for the page fully loaded
    Then I should see the toast message "Auto Discount added successfully" visible
    And I should see the "Discounts" screen
    Then I should see the new Discount "Auto Discount", Amount "50.00%", in the Discounts list
    When I click on the action "Delete" button for item "Auto Discount"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "Discount deleted successfully" visible
    




