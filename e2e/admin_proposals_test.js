/// <reference path="./steps.d.ts" />

Feature("Admin/Proposals");

const proposalTitle = "Proposal";
const proposalsPage = require("./pages/admin/proposals/admin_proposals_page");
var tokenCache = undefined;

Before(async I => {
  I.amOnPage("/");
  tokenCache = await I.loginFast(
    "Secretary",
    "secret",
    "/admin/proposals",
    tokenCache
  );

  // Wait for data loaded
  I.waitForElement(proposalsPage.proposalsTable.root);
  proposalsPage.createProposal(proposalTitle);
});

Scenario("I can create a new proposal", I => {
  within(proposalsPage.proposalsTable.root, function() {
    I.see(proposalTitle);
  });
}).tag("@proposal");

Scenario("I see the error message if proposal creation failed", I => {
  proposalsPage.createProposal("", false);
  I.waitForVisible(proposalsPage.editDialog.root + " .error");
}).tag("@proposal");

Scenario("I see snackbar message if operation was succeeded", () => {
  proposalsPage.snackbar.waitForOpen();
  proposalsPage.snackbar.contains("Proposal created/updated");
})
  .tag("@proposal")
  .tag("@snackbar");

Scenario("I can delete proposal", I => {
  within(proposalsPage.proposalsTable.root, function() {
    proposalsPage.proposalsTable.delete(proposalTitle);
  });
  proposalsPage.confirmDialog.confirm();
  within(proposalsPage.proposalsTable, function() {
    proposalsPage.proposalsTable.waitForDetached(proposalTitle);
    I.dontSee(proposalTitle);
  });
}).tag("@proposal");

Scenario("I see notification when proposal deleted", () => {
  proposalsPage.proposalsTable.delete("Proposal");
  proposalsPage.confirmDialog.confirm();
  proposalsPage.snackbar.waitForOpen();
  proposalsPage.snackbar.contains("Proposal deleted");
})
  .tag("@proposal")
  .tag("@snackbar");
