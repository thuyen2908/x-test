@regression @slow @page
Feature: Appointment Log

  Scenario: User can view the appointment log page
    Given I am on the HOME page
    When I click on the header menu
    And I select the "Logging" label in the menu list
    And I select the "Appointment Log" label in the expanded list
    Then I should be redirected to APPOINTMENT_LOG page
    And I should see the "Appointment Log" screen
