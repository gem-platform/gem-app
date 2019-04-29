/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

/** Login user using specified credentials  */
When("I login as {string} / {string}", async (username, password) => {
  const res = await I.sendPostRequest(
    "/auth/token",
    "username=" + username + "&password=" + password);

  context.username = username;
  context.token = res.data.access_token;

  if (!context.token) {
    console.error(res.data);
  }
});

/** Checks if user logged in */
Then("I logged in", async () => {
  if (!context.token) {
    throw Error("You are not logged in");
  }
});

/** Checks if user logged in */
Then("I logged in as {string}", async username => {
  const res = await I.sendGetRequest("/auth/me", {
    Authorization: "Bearer " + context.token
  });
  if (res.data.username != username) {
    throw Error(
      "You are logged as " + res.data.username + " but should as " + username
    );
  }
});

/** Checks if user logged in */
Then("I not logged in", async () => {
  if (context.token) {
    throw Error("You are logged in, but should not");
  }
});
