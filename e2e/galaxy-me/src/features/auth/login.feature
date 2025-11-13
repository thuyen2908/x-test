@regression @android @ios
Feature: User Authentication - Login

  As a Galaxy Me user
  I want to log in to the application
  So that I can access my account and use the app features

  Background:
    Given the Galaxy Me app is launched
    And I am on the login screen

  @smoke @happy-path @critical
  Scenario: Successful login with valid credentials
    When I enter username "test.customer@galaxyme.com"
    And I enter password "Test@1234"
    And I tap the login button
    Then I should see the home screen
    And I should see welcome message "Welcome back!"

  @negative @error-handling
  Scenario: Failed login with invalid password
    When I enter username "test.customer@galaxyme.com"
    And I enter password "wrongpassword"
    And I tap the login button
    Then I should see error message "Invalid credentials"
    And I should remain on the login screen

  @negative @validation
  Scenario: Failed login with empty credentials
    When I tap the login button
    Then I should see validation error "Please enter username"
    And I should see validation error "Please enter password"
    And I should remain on the login screen

  @negative @error-handling
  Scenario: Failed login with non-existent user
    When I enter username "nonexistent@example.com"
    And I enter password "Test@1234"
    And I tap the login button
    Then I should see error message "User not found"
    And I should remain on the login screen

  @negative @validation
  Scenario: Failed login with invalid email format
    When I enter username "invalid-email"
    And I enter password "Test@1234"
    And I tap the login button
    Then I should see validation error "Please enter a valid email"
    And I should remain on the login screen

  @data-driven @negative
  Scenario Outline: Login with various invalid credentials
    When I enter username "<username>"
    And I enter password "<password>"
    And I tap the login button
    Then I should see error message "<error>"
    And I should remain on the login screen

    Examples:
      | username                 | password      | error                    |
      | invalid@example.com      | Test@1234     | User not found          |
      | test@galaxyme.com        | wrongpass     | Invalid credentials     |
      | test@galaxyme.com        | 123           | Password too short      |
      |                          | Test@1234     | Please enter username   |
      | test@galaxyme.com        |               | Please enter password   |

  @functional @navigation
  Scenario: Navigate to forgot password screen
    When I tap the forgot password link
    Then I should see the forgot password screen

  @functional @navigation
  Scenario: Navigate to signup screen
    When I tap the signup link
    Then I should see the signup screen

  @security @timing
  Scenario: Login attempt rate limiting
    When I enter username "test@galaxyme.com"
    And I enter password "wrongpassword"
    And I tap the login button
    And I wait for 1 seconds
    And I tap the login button
    And I wait for 1 seconds
    And I tap the login button
    Then I should see error message "Too many login attempts"
    And I should see message "Please try again later"