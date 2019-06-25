Feature: Manage proposal reviews
  In order to perform my service
  As a secretary
  I want to be able to manage proposal reviews

  Background:
    Given I log in as "Secretary" / "secret"
    And Proposal "Test proposal" created
    And Review "Review" for "Test proposal" created

  @event @review
  Scenario: Secretary can create a review
    When I create a review "New review" for "Test proposal"
    Then Event "New review" exists

  @event @review
  Scenario: Secretary can delete review
    When I delete the event "Review"
    Then Event "Review" doesn't exist
  
  @event @review
  Scenario: Secretary can change the period for review
    When I set period for "Review" from "2012/12/12" to "2013/12/12"
    Then Start date for "Review" is "2012/12/12"
    And End date for "Review" is "2013/12/12"

  @event @review
  Scenario: Start date should be less than the end date
    When I set period for "Review" from "2019/12/12" to "2013/12/12"
    Then I see the error "End date should be greater than the start date"
