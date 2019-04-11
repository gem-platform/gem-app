Feature: Authentication
  In order to perform my service
  As a user
  I want to be able to login into GEM application

  Scenario: User logs on to application
    Given I am an authorized user
    When I login with valid credentials
    Then I should be provided access to my account

  Scenario: User logs on to an application with invalid credentials
    Given I am an authorized user
    When I login with invalid credentials
    Then I see an error message "Incorrect email or password"

# Scenario: Suspended user logs on to application
#   Given I am a suspended user
#   When I login with valid credentials
#   Then I see an error message "Your account has been suspended"
#    And I see suspension reason ??