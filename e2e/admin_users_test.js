/// <reference path="./steps.d.ts" />

Feature("Admin/Users");

const usersPage = require("./pages/admin/users");

BeforeSuite(I => {
  I.wipeout("./fixtures/johndoe.js");
});

Before(I => {
  I.amOnPage("/");
  I.login("johndoe", "secret");
  I.waitForText("Welcome");
});

Scenario("I can create a new user", I => {
  const username = "Krishna das";

  usersPage.navigateEditDialog();
  within(usersPage.editDialog, function () {
    usersPage.submitDialog(username);
  })
  I.waitForInvisible(usersPage.editDialog);

  within(usersPage.usersTable, function () {
    I.see(username);
  });
});

Scenario("I see snackbar message if operation was succeeded", I => {
  const username = "Krishna das";

  usersPage.navigateEditDialog();
  within(usersPage.editDialog, function () {
    usersPage.submitDialog(username);
  })
  I.waitForVisible(usersPage.snackbar);
  I.see("User created/updated")
});