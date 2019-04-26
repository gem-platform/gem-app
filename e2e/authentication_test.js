/// <reference path="./steps.d.ts" />

Feature("Authentication Form");

const validLogin = "johndoe";
const validPassword = "secret";
const invalidPassword = "invalid";

Before(I => {
  I.amOnPage("/login");
});

Scenario("I see login form at login page", I => {
  I.see("Login");
});

Scenario("I able to login with valid credentials", I => {
  I.login(validLogin, validPassword);
  I.waitForText(`Welcome back, ${validLogin}!`);
});

Scenario("I'm unable to login with invalid credentials", I => {
  I.login(validLogin, invalidPassword);
  I.waitForText("Incorrect email or password");
});

Scenario("Redirects to login page if token was expired", I => {
  I.login(validLogin, validPassword);
  I.waitForText("Welcome back");
  I.executeScript(() => (localStorage.token = "expired"));
  I.amOnPage("/");
  I.waitForText("Login");
});
