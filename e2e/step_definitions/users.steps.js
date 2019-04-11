/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const adminUsersPage = require("../pages/admin/users");

Given("I am an administrative user", () => {
  I.login("johndoe", "secret");
});

When("I create a user {string}", username => {
  I.amOnPage("/admin/users/create");
  adminUsersPage.sendForm(username, "pwd");
});

Then("I can see user {string}", username => {
  I.amOnPage("/admin/users");
  I.see(username);
});
