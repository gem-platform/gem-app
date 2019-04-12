Feature: Admin/Users
  In order to perform my service
  As an administrator
  I want to be able manage users

  Scenario: Administrator can create a new user
    Given I am an administrative user
    When I create a user "Krishna das"
    Then I can see user "Krishna das"
