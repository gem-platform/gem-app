/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I log out", () => {
  context.username = "";
  context.token = "";
  context.headers["Authorization"] = "";
});

/** Login user using specified credentials  */
When("I log in as {string} / {string}", async (username, password) => {
  context.response = (await I.sendPostRequest(
    "/auth/token",
    "username=" + username + "&password=" + password
  )).data;

  context.username = username;
  context.token = context.response.access_token;
  context.headers["Authorization"] = "Bearer " + context.token;
});

/** Checks if user logged in */
Then("I logged in", async () => {
  if (!context.token) {
    throw Error("You are not logged in");
  }
});

/** Checks if user logged in */
Then("I logged in as {string}", async username => {
  const res = await I.sendGetRequest("/auth/me", context.headers);
  if (res.data.name !== username) {
    throw Error(
      "You are logged as " + res.data.name + " but should as " + username
    );
  }
});

/** Checks if user logged in */
Then("I not logged in", async () => {
  if (context.token) {
    throw Error("You are logged in, but should not");
  }
});
