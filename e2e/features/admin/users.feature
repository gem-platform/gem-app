Feature: Manage accounts
  In order to perform my service
  As an secretary
  I want to be able manage users' accounts

  Background:
    Given I login as "Secretary" / "secret"
    And "Krishna" with password "password" exist

  Scenario: Secretary can create a new user
    When I create user "Gopinath das"
    Then User "Gopinath das" exists

  Scenario: Secretary can delete user
    When I delete user "Krishna"
    Then User "Krishna" doesn't exist

  @change-password
  Scenario: Secretary can change a password for user
    When I set password for "Krishna" as "new_password"
    And I login as "Krishna" / "new_password"
    Then I logged in as "Krishna"

  @change-password
  Scenario: User can't login using old password
    When I set password for "Krishna" as "new_password"
    And I login as "Krishna" / "password"
    Then I not logged in
    And I see error "Incorrect email or password"

  @change-password
  Scenario: Password must be at least 6 characters
    When I set password for "Krishna" as "short"
    Then I see error "Should be at least 6 characters long"

  @change-password
  Scenario: Unauthorized user can't change password
    When I logout
    And I set password for "Krishna" as "short"
    Then I see error "Not authenticated"
