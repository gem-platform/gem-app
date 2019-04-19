/// <reference path="./steps.d.ts" />

Feature("Admin/Users");

const username = "Krishna das";
const usersPage = require("./pages/admin/users/admin_users_page");

Before(I => {
  I.wipeout("./fixtures/johndoe.js");
  I.amOnPage("/");
  I.login("johndoe", "secret");
  I.waitForText("Welcome");
  usersPage.open();
});

Scenario("I can create a new user", I => {
  usersPage.createUser(username);
  within(usersPage.usersTable, function() {
    I.see(username);
  });
});

Scenario("I see snackbar message if operation was succeeded", I => {
  usersPage.createUser(username);
  usersPage.snackbar.contains("User created/updated");
});

Scenario("I can delete user", I => {
  usersPage.createUser(username);
  within(usersPage.usersTable, function() {
    I.click("[data-ref='delete-user']");
  });
  usersPage.confirmDialog.confirm();
  within(usersPage.usersTable, function() {
    I.waitForDetached("[data-ref='delete-user']");
    I.dontSee(username);
  });
});
