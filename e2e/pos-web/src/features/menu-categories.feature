@regression @slow @page
Feature: Menu Categories management

  Scenario: View the Menu Categories management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Categories" label in the expanded list
    Then I should be redirected to CATEGORIES page
    And I should see the "Menu Categories" screen
 
 Scenario: Add and then delete a Menu Category
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Menu Categories" label in the expanded list
    Then I should be redirected to CATEGORIES page
    And I should see the "Menu Categories" screen
    When I click on the "New Category" button 
    Then I should be redirected to CATEGORIES_CREATE page
    And I should see the "Create Menu Category" screen
    When I fill the "Category Name" field with value "AutoTestMenuCategory"
    When I fill the "Check-in Name" field with value "AutoTestMenuCategory"
    When I click on the check-box "Add to CheckIn" button
    When I select the "Employees Show on Check-In" tab
    When I click on the check-box Select All button
    When I click on the "Save" button 
    And I wait for the page fully loaded
    Then I should see the toast message "The data item has been created successfully" visible
    When I search for "AutoTestMenuCategory"
    And I wait for the page fully loaded
    Then I should see the new Menu Category  "AutoTestMenuCategory", Category Type "Service", in the Menu Categories list
    When I click on the action "Delete" button for item "AutoTestMenuCategory"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been deleted permanently successfully" visible