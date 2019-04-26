Feature: Admin/Users
  In order to perform my service
  As an administrator
  I want to be able manage users

  Background:
    Given I am an administrative user

  Scenario: Administrator can create a new user
    When I create a user "Krishna das"
    Then I can see user "Krishna das"
