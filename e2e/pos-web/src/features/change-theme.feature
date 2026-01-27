@regression @slow @page
Feature: Change theme

  Scenario: Change the theme applied to the application
    Given I am on the HOME page
    When I wait for the page fully loaded
    And I click on the header menu
    And I select the "Change Theme" label in the menu list
    Then I should see a popup dialog with title "Change Theme"

    When I select the theme "Blush"
    Then I should see the theme "blush" applied to the application

    When I select the theme "Fresh"
    Then I should see the theme "fresh" applied to the application

    When I select the theme "Default"
    And I click on the action button "Save" of the opening dialog
    # And I click on the "Save" button in the dialog
    Then I should see the theme "default" applied to the application
