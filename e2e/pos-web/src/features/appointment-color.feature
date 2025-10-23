@regression @smoke @slow
Feature: Appointment Color management

  Scenario: View the Appointment Color management page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Back Office" label in the menu list
    And I select the "Appointment Colors" label in the expanded list
    Then I should be redirected to APPOINTMENT_COLOR page
    And I should see the "Appointment Color" screen
