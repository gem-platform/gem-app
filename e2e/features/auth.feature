Feature: Authentication
  In order to perform my service
  As a user
  I want to be able to login into GEM application

  Background:
    Given "Krishna das" with password "password" exist

  Scenario: User logs on to the application
    When I log in as "Krishna das" / "password"
    Then I logged in as "Krishna das"

  Scenario: User can't log on with invalid credentials
    When I log in as "Krishna das" / "password_error"
    Then I not logged in
