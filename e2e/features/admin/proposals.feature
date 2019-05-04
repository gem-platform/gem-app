Feature: Manage proposals
  In order to perform my service
  As a secretary
  I want to be able to manage proposals

  Background:
    Given I log in as "Secretary" / "secret"
    And Proposal "Test proposal" created

  @admin @proposal
  Scenario: Secretary can create a new proposal
    When I create the proposal "Test proposal"
    Then Proposal "Test proposal" exists

  @admin @proposal
  Scenario: Secretary can delete proposal
    When I delete the proposal "Test proposal"
    Then Proposal "Test proposal" doesn't exist

  @admin @proposal
  Scenario: Secretary can edit proposal
    When I set a title for "Test proposal" as "New proposal"
    Then Proposal "Test proposal" exists
    And Proposal "New proposal" doesn't exist

  @admin @proposal
  Scenario: Proposal title should be at least 3 characters long
    When I create the proposal "N"
    Then I see the error "ensure this value has at least 3 characters"
  