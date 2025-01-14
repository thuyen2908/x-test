Feature: Playwright site

  Scenario: Check get started link
    Given I am on Playwright home page
    When I click link "Get started"
    Then I see in title "Installation"
