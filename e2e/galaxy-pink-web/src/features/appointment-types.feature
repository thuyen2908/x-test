@regression @smoke
Feature: Appointment Types management

  Scenario: View the Appointment Types management page
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Appointment Types" label in the expanded list
    Then I should be redirected to APPOINTMENT_TYPES page
    And I should see the "Appointment Types" screen
