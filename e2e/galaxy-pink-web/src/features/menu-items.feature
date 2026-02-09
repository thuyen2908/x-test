@regression @slow @page
Feature: Menu Items management

  Scenario: View the Menu Items management page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Items" label in the expanded list
    Then I should be redirected to PRODUCTS page
    And I should see the "Menu Items" screen

  @skip
  Scenario: add and then delete a Menu Item
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Items" label in the expanded list
    Then I should be redirected to PRODUCTS page
    And I should see the "Menu Items" screen
    When I click on the "New Service" button
    Then I should be redirected to PRODUCTS_CREATE_MENU_ITEM page
    # When I wait for the page fully loaded
    When I fill the "Item Name" field with value "AutoTestMenuItem"
    When I waiting 1s
    When I fill the "Online Appt book item name" field with value "AutoTestMenuItem"
    When I waiting 1s
    When I fill the "Regular Price" field with value "888"
    When I fill the "Service Duration" field with value "30"
    When I select the "Department menu item" with value "Nails"
    When I select the "Category menu item" with value "WAXING"
    When I select the "Advance" tab
    When I switch ON "Taxable" 
    When I click on the "Save" button
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been added successfully" visible
    When I click on the "Refresh" button
    And I wait for the page fully loaded
    When I search for "AutoTestMenuItem"
    And I wait for the page fully loaded      
    Then I should see the new item "AutoTestMenuItem", Category "WAXING", in the Menu Items list
    And I wait for the page fully loaded
    Then I should see the new "name" "AutoTestMenuItem", created at today, in the list
    When I click on the action "Delete" button for item "AutoTestMenuItem"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been deleted permanently successfully" visible
