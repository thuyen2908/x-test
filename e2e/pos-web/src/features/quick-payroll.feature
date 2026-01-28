@regression @smoke @slow
Feature: Quick payroll

  Scenario: View the Quick Payroll page, view Preview Summary and send email
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Manager" label in the menu list
    And I select the "Quick Payroll" label in the expanded list
    Then I should be redirected to QUICK_PAYROLL page
    And I should see the "Quick Payroll" screen
    And I should see the default filter set to Today
    And I should see the "SEND EMAIL" button visible on the header
    And I should see the "PREVIEW SUMMARY" button visible on the header
    And I should see the "PRINT SUMMARY" button visible on the header
    And I should see the "PRINT ALL PAYROLL" button visible on the header

    When I click on the "Today" button
    And I wait for the page fully loaded
    And I click on the "PREVIEW SUMMARY" button
    Then I should see the text "Payroll Summary" in the payroll summary

    When I click on the "SEND EMAIL" button
    Then I should see a popup dialog with title "Send Email"
    Then I should see a popup dialog with content "Exclude employees with total = $0.00"
