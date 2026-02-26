@regression @slow @page
Feature: Menu Items management

  Scenario: View the Menu Items management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Items" label in the expanded list
    Then I should be redirected to PRODUCTS page
    And I should see the "Menu Items" screen

  Scenario: Add and then delete a Menu Item
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Items" label in the expanded list
    Then I should be redirected to PRODUCTS page
    And I should see the "Menu Items" screen

    When I click on the "New Service" button
    Then I should be redirected to PRODUCTS_CREATE_MENU_ITEM page

    When I fill the "Item Name" field with value "AutoTestMenuItem"
    And I fill the "Online Appt book item name" field with value "AutoTestMenuItem"
    And I fill the "Regular Price" field with value "888"
    And I fill the "Service Duration" field with value "30"
    And I select the "Department menu item" with value "Nails"
    And I select the "Category menu item" with value "WAXING"

    And I select the "Advance" tab
    And I switch ON "Taxable"
    And I switch ON "Hide"
    And I click on the "Save" button
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been added successfully" visible

    When I click on the "Refresh" button
    And I wait for the page fully loaded
    And I search for "AutoTestMenuItem"
    And I wait for the page fully loaded
    Then I should see the new item "AutoTestMenuItem", Category "WAXING", in the Menu Items list

    When I click on the action "Delete" button for item "AutoTestMenuItem"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been deleted permanently successfully" visible
