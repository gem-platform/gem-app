Feature: Authentication

  Scenario: User logs on to application
    Given I am an authorized user
    When I login with valid credentials
    Then I should be provided access to my account

  Scenario: User logs on to an application with invalid credentials
    Given I am an authorized user
    When I login with invalid credentials
    Then I see an error message

  Scenario: Suspended user logs on to application
    Given I am a suspended user
    When I login with valid credentials
    Then I see a message with suspension reason