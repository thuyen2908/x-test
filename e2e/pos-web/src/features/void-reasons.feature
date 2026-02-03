@regression @slow @page
Feature: Void reasons management

  Scenario: User can view the list of void reasons
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Void Reasons" label in the expanded list
    Then I should be redirected to VOID_REASONS page
    And I should see the "Void Reasons" screen

 Scenario: Add and then delete a Void Reason
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Void Reasons" label in the expanded list
    Then I should be redirected to VOID_REASONS page
    And I should see the "Void Reasons" screen
    When I click on the "Add New" button 
    Then I should see a popup dialog with title "Create New Reason"
    When I fill the "Void Reason" field with value "AutoTestVoidReason"
    Then Active button should be ON with value true
    When I click on the "Save" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data item has been added successfully" visible
    When I click on the "Refresh" button 
    And I wait for the page fully loaded
    When I search for "AutoTestVoidReason"
    And I wait for the page fully loaded
    Then I should see the new "reason" "AutoTestVoidReason", created at today, in the list
    When I click on the action "Delete" button for item "AutoTestVoidReason"
    Then I should see a popup dialog with title "Delete Confirmation"
    When I click on the "Delete" button in the popup dialog
    And I wait for the page fully loaded
    Then I should see the toast message "The data has been deleted permanently successfully" visible 