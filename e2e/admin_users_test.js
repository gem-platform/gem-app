/// <reference path="./steps.d.ts" />

Feature("Admin/Users");

const username = "Krishna das";
const usersPage = require("./pages/admin/users/admin_users_page");

Before(I => {
  I.amOnPage("/");
  I.login("johndoe", "secret");
  I.waitForText("Welcome");
  usersPage.open();
});

Scenario("I can create a new user", I => {
  usersPage.createUser(username);
  within(usersPage.usersTable.root, function() {
    I.see(username);
  });
});

Scenario("I see error message if user creation failed", I => {
  usersPage.createUser("", false);
  I.see("Error:");
});

Scenario("I see snackbar message if operation was succeeded", () => {
  usersPage.createUser(username);
  usersPage.snackbar.contains("User created/updated");
});

Scenario("I can delete user", I => {
  usersPage.createUser(username);
  within(usersPage.usersTable.root, function() {
    usersPage.usersTable.delete(username);
  });
  usersPage.confirmDialog.confirm();
  within(usersPage.usersTable, function() {
    usersPage.usersTable.waitForDetached(username);
    I.dontSee(username);
  });
});
