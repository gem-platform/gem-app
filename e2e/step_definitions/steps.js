/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
let user = {};

Given("I am an authorized user", () => {
  I.amOnPage("/login");
  user = { username: "johndoe", password: "secret", full_name: "John Doe" };
});

When("I login with {word} credentials", type => {
  if (type === "valid") {
    I.login(user.username, user.password);
  } else if (type === "invalid") {
    I.login(user.username, user.password + "-incorrect");
  } else {
    throw Error("Unknown type of credentials");
  }
});

Then("I should be provided access to my account", () => {
  I.waitForText("Welcome back, " + user.username);
});

Given("I am a suspended user", () => {
  // From "features/authentication.feature" {"line":14,"column":5}
  throw new Error("Not implemented yet");
});

Then("I see an error message {string}", message => {
  I.waitForVisible(".v-alert");
  I.waitForText(message);
});
