Feature: Manage accounts
  In order to perform my service
  As a secretary
  I want to be able to manage users' accounts

  Background:
    Given I log in as "Secretary" / "secret"
    And "Krishna" with password "password" exist

  Scenario: Secretary can create a new user
    When I create user "Gopinath das"
    Then User "Gopinath das" exists

  Scenario: Secretary can delete user
    When I delete user "Krishna"
    Then User "Krishna" doesn't exist

  @change-password
  Scenario: Secretary can change a password for user
    When I set a password for "Krishna" as "new_password"
    And I log in as "Krishna" / "new_password"
    Then I logged in as "Krishna"

  @change-password
  Scenario: User can't log in using old password
    When I set a password for "Krishna" as "new_password"
    And I log in as "Krishna" / "password"
    Then I not logged in
    And I see the error "Incorrect email or password"

  @change-password
  Scenario: Password must be at least 6 characters
    When I set a password for "Krishna" as "short"
    Then I see the error "Should be at least 6 characters long"

  @change-password
  Scenario: Unauthorized user can't change password
    When I log out
    And I set a password for "Krishna" as "short"
    Then I see the error "Not authenticated"

  @change-password
  Scenario: Password remains the same after user update
    When I set a password for "Krishna" as "keep_password"
    And I set a name for "Krishna" as "Krishna das"
    And I log in as "Krishna" / "keep_password"
    Then I logged in as "Krishna"
