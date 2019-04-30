/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I create user {string}", async username => {
  const res = await I.sendPostRequest("/users/", {
    username: username,
    full_name: username,
    email: username + "@test.com",
    password: "password"
  });
  context.users[username] = res.data;
});

When("I delete user {string}", username => {
  const user = context.users[username];
  if (!user) {
    throw Error("No user found");
  }
  I.sendDeleteRequest("/users/" + user.oid);
});

Then("User {string} exists", async username => {
  const res = (await I.sendGetRequest("/users/")).data;
  const users = res.filter(x => x.username == username);
  if (users.lenght <= 0) {
    throw Error("No one user found");
  }
  if (users.lenght > 1) {
    throw Error("Too many users found");
  }
});

Then("User {string} doesn't exist", async username => {
  const res = (await I.sendGetRequest("/users/")).data;
  const users = res.filter(x => x.username == username);
  if (users.lenght > 0) {
    throw Error("User still exists");
  }
});

/** Set password for specified user */
When("I set password for {string} as {string}", async (username, password) => {
  const user = context.users[username];
  if (!user) {
    throw Error("No user found");
  }

  const url = "/users/" + user.oid + "/changePassword";
  context.response = (await I.sendPutRequest(
    url,
    { password },
    context.headers
  )).data;
});

Given("{string} with password {string} exist", async (username, password) => {
  const res = await I.sendPostRequest("/users/", {
    username: username,
    full_name: username,
    email: username + "@test.com",
    password: password
  });
  context.users[username] = res.data;
});
