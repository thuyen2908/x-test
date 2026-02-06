Feature: Check-in

  Scenario: Verify galaxy-in-pink page loads successfully
    Given I navigate to the galaxy-in-pink homepage
    Then I should see the page title
    And the page should be loaded successfully

    When I fill the activation code "271243578"
    And I click on the "ACTIVATE" button
    Then I should see the text "PINK SALON" visible
