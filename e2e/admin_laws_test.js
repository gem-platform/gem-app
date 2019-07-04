/// <reference path="./steps.d.ts" />

Feature("Admin/Laws");

const lawTitle = "Law";
const lawsPage = require("./pages/admin/laws/admin_laws_page");
var tokenCache = undefined;

Before(async I => {
  I.amOnPage("/");
  tokenCache = await I.loginFast(
    "Secretary",
    "secret",
    "/admin/laws",
    tokenCache
  );

  // Wait for data loaded
  I.waitForElement(lawsPage.lawsTable.root);
  lawsPage.createLaw(lawTitle);
});

Scenario("I can create a new law", I => {
  within(lawsPage.lawsTable.root, function() {
    I.see(lawTitle);
  });
}).tag("@law");

Scenario("I see the error message if law creation failed", I => {
  lawsPage.createLaw("", false);
  I.waitForVisible(lawsPage.editDialog.root + " .error");
}).tag("@law");

Scenario("I see snackbar message if operation was succeeded", () => {
  lawsPage.snackbar.waitForOpen();
  lawsPage.snackbar.contains("Law created/updated");
})
  .tag("@law")
  .tag("@snackbar");

Scenario("I can delete law", I => {
  within(lawsPage.lawsTable.root, function() {
    lawsPage.lawsTable.delete(lawTitle);
  });
  lawsPage.confirmDialog.confirm();
  within(lawsPage.lawsTable, function() {
    lawsPage.lawsTable.waitForDetached(lawTitle);
    I.dontSee(lawTitle);
  });
}).tag("@law");

Scenario("I see notification when law deleted", () => {
  lawsPage.lawsTable.delete("Law");
  lawsPage.confirmDialog.confirm();
  lawsPage.snackbar.waitForOpen();
  lawsPage.snackbar.contains("Law deleted");
})
  .tag("@law")
  .tag("@snackbar");
