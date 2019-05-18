/// <reference path="./steps.d.ts" />

Feature("Admin/Users");

const username = "krishna das";
const usersPage = require("./pages/admin/users/admin_users_page");

Before(I => {
  I.amOnPage("/");
  I.login("Secretary", "secret");
  I.waitForText("Welcome");
  usersPage.open();

  // Wait for data loaded
  // I.waitForElement(usersPage.usersTable.root);
  // within(usersPage.usersTable.root, () => {
  //   I.waitForText("secretary");
  // });
});

Scenario("I can create a new user", I => {
  usersPage.createUser(username);
  within(usersPage.usersTable.root, function() {
    I.see(username);
  });
});

Scenario("I see the error message if user creation failed", I => {
  usersPage.createUser("", false);
  I.waitForVisible(usersPage.editDialog.root + " .error");
});

Scenario("I see snackbar message if operation was succeeded", () => {
  usersPage.createUser(username);
  usersPage.snackbar.waitForOpen();
  usersPage.snackbar.contains("User created/updated");
}).tag("@snackbar");

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

Scenario("I see notification when user deleted", () => {
  usersPage.usersTable.delete("secretary");
  usersPage.confirmDialog.confirm();
  usersPage.snackbar.waitForOpen();
  usersPage.snackbar.contains("User deleted");
}).tag("@snackbar");

Scenario("I see 'Change Password' button for created user", I => {
  usersPage.usersTable.clickEdit("secretary");
  within(usersPage.editDialog.root, () => {
    I.see("CHANGE PASSWORD");
  });
}).tag("@change-password");

Scenario("I don't see 'Change Password' button for new user", I => {
  usersPage.clickCreateUser();
  within(usersPage.editDialog.root, () => {
    I.dontSee("CHANGE PASSWORD");
  });
}).tag("@change-password");

Scenario("I see dialog when I click 'Change Password' button", I => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  I.waitForVisible(usersPage.changePasswordDialog.root);
}).tag("@change-password");

Scenario("I can cancel 'Change Password' dialog", () => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.clickCancel();
  usersPage.changePasswordDialog.waitForClose();
}).tag("@change-password");

Scenario("I can change password", () => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("new_password");
  usersPage.changePasswordDialog.waitForClose();
}).tag("@change-password");

Scenario("I can change password after fail", () => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("");
  usersPage.changePasswordDialog.submit("new_password");
  usersPage.changePasswordDialog.waitForClose();
}).tag("@change-password");

Scenario("I see error message on fail", I => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("1");
  I.waitForVisible(usersPage.changePasswordDialog.alert);
}).tag("@change-password");

Scenario("I see notification on success", () => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("1234567");
  usersPage.snackbar.waitForOpen();
  usersPage.snackbar.contains("Password changed");
})
  .tag("@change-password")
  .tag("@snackbar");

Scenario("I see no error message after fail and reopen", I => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("123");
  usersPage.changePasswordDialog.clickCancel();
  usersPage.editDialog.clickChangePassword();
  I.dontSee("Should be at least 6 characters long");
}).tag("@change-password");

Scenario("I see empty password field after reopen", async I => {
  usersPage.usersTable.clickEdit("secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("123");
  usersPage.changePasswordDialog.clickCancel();
  usersPage.editDialog.clickChangePassword();
  const value = await I.grabValueFrom(
    usersPage.changePasswordDialog.fields.password
  );
  if (value) throw Error("Password field is not empty");
}).tag("@change-password");
