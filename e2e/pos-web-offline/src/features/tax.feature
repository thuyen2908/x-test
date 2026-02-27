@regression @slow @page
Feature: Tax management

  Scenario: User can view the list of tax
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Tax" label in the expanded list
    Then I should be redirected to TAX page
    And I should see the "Tax" screen

  Scenario: Add and then delete a Tax
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Tax" label in the expanded list
    Then I should be redirected to TAX page
    And I should see the "Tax" screen
    When I click on the "Add New" button 
    Then I should see a popup dialog with title "Create New Tax"
    When I fill the "Tax Name" field with value "AutoTestTax"
    When I fill the "Value Tax" field with value "10"
    When I click on checkbox Active
    Then Active button should be ON with value true
    When I click on the "Save" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "AutoTestTax created successfully" visible
    When I click on the "Refresh" button 
    And I wait for the page fully loaded
    When I search for "AutoTestTax"
    And I wait for the page fully loaded
    Then I should see the new "name" "AutoTestTax", created at today, in the list
    When I click on the action "Delete" button for item "AutoTestTax"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "Tax deleted successfully" visible  