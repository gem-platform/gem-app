/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const usersPage = require("../pages/admin/users");

Given("I am an administrative user", () => {
  I.amOnPage("/login")
  I.login("johndoe", "secret");
  I.waitForText("Welcome");
});

When("I create a user {string}", username => {
  I.amOnPage("/admin/users");
  I.click(usersPage.createButton);
  I.waitForVisible(usersPage.editDialog);

  within(usersPage.editDialog, function () {
    usersPage.submitDialog(username);
  })
  
  I.waitForInvisible(usersPage.editDialog);
});

Then("I can see user {string}", username => {
  within(usersPage.usersTable, function () {
    I.see(username);
  });
});
