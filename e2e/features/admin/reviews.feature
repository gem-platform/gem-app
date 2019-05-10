Feature: Manage proposal reviews
  In order to perform my service
  As a secretary
  I want to be able to manage proposal reviews

  Background:
    Given I log in as "Secretary" / "secret"
    And Proposal "Test proposal" created
    And Review "Review" for "Test proposal" created

  @review
  Scenario: Secretary can create a review
    When I create a review "New review" for "Test proposal"
    Then Review "New review" exists

  @review
  Scenario: Secretary can delete review
    When I delete the review "Review"
    Then Review "Review" doesn't exist
  
  @review
  Scenario: Secretary can change the start date for review
    When I set the start date for "Review" as "2012/12/12"
    Then Start date for "Review" is "2012/12/12"

  @review
  Scenario: Secretary can change the end date for review
    When I set the end date for "Review" as "2012/12/12"
    Then End date for "Review" is "2012/12/12"

  @review
  Scenario: Start date should be less than the end date
    When I set the end date for "Review" as "2012/12/12"
    And I set the start date for "Review" as "3012/12/12"
    Then I see the error "End date should be greater than the start date"
