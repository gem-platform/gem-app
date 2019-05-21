/// <reference path="./steps.d.ts" />

Feature("Admin/Users");

const name = "Krishna das";
const usersPage = require("./pages/admin/users/admin_users_page");
var tokenCache = undefined;

Before(async I => {
  tokenCache = await I.loginFast(
    "Secretary",
    "secret",
    "/admin/users",
    tokenCache
  );

  // Wait for data loaded
  I.waitForElement(usersPage.usersTable.root);
  within(usersPage.usersTable.root, () => {
    I.waitForText("Secretary");
  });
});

Scenario("I can create a new user", I => {
  usersPage.createUser({ name });
  within(usersPage.usersTable.root, function() {
    I.see(name);
  });
});

Scenario("I see the error message if user creation failed", I => {
  usersPage.createUser({ name: "" }, false);
  I.waitForVisible(usersPage.editDialog.root + " .error");
});

Scenario("I see snackbar message if operation was succeeded", () => {
  usersPage.createUser({ name });
  usersPage.snackbar.waitForOpen();
  usersPage.snackbar.contains("User created/updated");
}).tag("@snackbar");

Scenario("I can delete user", I => {
  usersPage.createUser({ name });
  within(usersPage.usersTable.root, function() {
    usersPage.usersTable.delete(name);
  });
  usersPage.confirmDialog.confirm();
  within(usersPage.usersTable, function() {
    usersPage.usersTable.waitForDetached(name);
    I.dontSee(name);
  });
});

Scenario("I see notification when user deleted", () => {
  usersPage.usersTable.delete("Secretary");
  usersPage.confirmDialog.confirm();
  usersPage.snackbar.waitForOpen();
  usersPage.snackbar.contains("User deleted");
}).tag("@snackbar");

Scenario("I see 'Change Password' button for created user", I => {
  usersPage.usersTable.clickEdit("Secretary");
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
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  I.waitForVisible(usersPage.changePasswordDialog.root);
}).tag("@change-password");

Scenario("I can cancel 'Change Password' dialog", () => {
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.clickCancel();
  usersPage.changePasswordDialog.waitForClose();
}).tag("@change-password");

Scenario("I can change password", () => {
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("new_password");
  usersPage.changePasswordDialog.waitForClose();
}).tag("@change-password");

Scenario("I can change password after fail", () => {
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("");
  usersPage.changePasswordDialog.submit("new_password");
  usersPage.changePasswordDialog.waitForClose();
}).tag("@change-password");

Scenario("I see error message on fail", I => {
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("1");
  I.waitForVisible(usersPage.changePasswordDialog.alert);
}).tag("@change-password");

Scenario("I see notification on success", () => {
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("1234567");
  usersPage.snackbar.waitForOpen();
  usersPage.snackbar.contains("Password changed");
})
  .tag("@change-password")
  .tag("@snackbar");

Scenario("I see no error message after fail and reopen", I => {
  usersPage.usersTable.clickEdit("Secretary");
  usersPage.editDialog.clickChangePassword();
  usersPage.changePasswordDialog.waitForOpen();
  usersPage.changePasswordDialog.submit("123");
  usersPage.changePasswordDialog.clickCancel();
  usersPage.editDialog.clickChangePassword();
  I.dontSee("Should be at least 6 characters long");
}).tag("@change-password");

Scenario("I see empty password field after reopen", async I => {
  usersPage.usersTable.clickEdit("Secretary");
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

Scenario("I see validation error for password field", I => {
  usersPage.createUser({ name: "Gita Govinda dd", password: "" }, false);
  within(usersPage.editDialog.blocks.password, function() {
    I.see("ensure this value has at least 6 characters");
  });
}).tag("@validation");

Scenario("I see validation error for name field", I => {
  usersPage.createUser({ name: "-", password: "1234567890" }, false);
  within(usersPage.editDialog.blocks.name, function() {
    I.see("ensure this value has at least 3 characters");
  });
}).tag("@validation");

Scenario("I can change a role for user", I => {
  const user = {
    name: "Sakshi Gopal das",
    password: "1234567890",
    role: "Admin"
  };

  // create user
  usersPage.createUser(user, false);
  within(usersPage.usersTable.root, function() {
    I.waitForText(user.name);
  });

  // see same role at edit page
  usersPage.usersTable.clickEdit(user.name);
  within(usersPage.editDialog.blocks.role, function() {
    I.see(user.role);
  });
}).tag("@role");
