@regression @smoke @slow
Feature: Turn detail

  Scenario: Verify the specific queue loads correctly employees
    Given I am on the HOME page
    When I navigate to "Turn" on the navigation bar
    Then I should be redirected to TURN_DETAILS page

    When I wait for the page fully loaded
    Then I should see the text "Technicians" visible
    And I should see the text "Nails" visible
    And I should see the text "Hair" visible

    When I click on the "Hair" button
    Then I should see the employees displayed correctly in turn details
