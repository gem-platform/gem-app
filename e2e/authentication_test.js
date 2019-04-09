/// <reference path="./steps.d.ts" />

Feature("Authentication Form");

Before(I => {
  I.amOnPage("/login");
});

Scenario("I see login form at login page", I => {
  I.see("Login");
});

Scenario("I able to login with valid credentials", I => {
  I.fillField("username", "admin");
  I.fillField("password", "password");
  I.click("submit");
  I.see("Welcome back, admin!");
});

Scenario("I'm unable to login with invalid credentials", I => {
  I.fillField("username", "admin");
  I.fillField("password", "wrong-password");
  I.click("submit");
  I.see("Wrong login/password");
});
