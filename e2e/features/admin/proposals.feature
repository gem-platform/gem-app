Feature: Manage proposals
  In order to perform my service
  As a secretary
  I want to be able to manage proposals

  Background:
    Given I log in as "Secretary" / "secret"
    And Proposal "Test proposal" created

  @admin @proposal
  Scenario: Secretary can create a new proposal
    When I create the proposal "New proposal"
    Then Proposal "New proposal" exists

  @admin @proposal
  Scenario: Secretary can delete proposal
    When I delete the proposal "Test proposal"
    Then Proposal "Test proposal" doesn't exist

  @admin @proposal
  Scenario: Secretary can edit proposal
    When I set a title for "Test proposal" as "New proposal"
    Then Proposal "Test proposal" doesn't exist
    And Proposal "New proposal" exists

  @admin @proposal
  Scenario: Proposal title should be at least 3 characters long
    When I create the proposal "N"
    Then I see the error "ensure this value has at least 3 characters"
  
  # Lock proposal
  # The proposal must be locked for modification in order to be
  # sure that comments are placed in the same place (in the same paragraph).
  # If, after the comments have been left, the document is changed,
  # the position of the comments may become incorrect.

  @admin @proposal @proposal-lock
  Scenario: Secretary can lock proposal for modification
    When I lock proposal "Test proposal" for modification
    Then Proposal "Test proposal" is locked
  
  @admin @proposal @proposal-lock
  Scenario: Unable to edit locked proposal
    When I lock proposal "Test proposal" for modification
    Then I set a title for "Test proposal" as "New proposal"
    And I see the error "Proposal is locked for modification"
  