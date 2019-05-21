/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I create user {string}", async name => {
  context.response = await createUser({ name }, context.token);
});

When("I delete user {string}", name => {
  const user = context.users[name];
  if (!user) {
    throw Error("No user found");
  }
  I.sendDeleteRequest("/users/" + user.oid, context.headers);
});

Then("User {string} exists", async name => {
  const res = (await I.sendGetRequest("/users/", context.headers)).data;
  const users = res.filter(x => x.name === name);
  if (users.length <= 0) {
    throw Error("No user found");
  }
  if (users.length > 1) {
    throw Error("Too many users found");
  }
});

Then("User {string} doesn't exist", async name => {
  const res = (await I.sendGetRequest("/users/", context.headers)).data;
  const users = res.filter(x => x.name == name);
  if (users.length > 0) {
    throw Error("User still exists");
  }
});

/** Set password for specified user */
When("I set a password for {string} as {string}", async (name, password) => {
  const user = context.users[name];
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

/** Set name for specified user */
When("I set a name for {string} as {string}", async (name, newName) => {
  const user = context.users[name];
  if (!user) {
    throw Error("No user found");
  }

  user.name = newName;

  const url = "/users/" + user.oid;
  context.response = (await I.sendPutRequest(url, user, context.headers)).data;
});

Given("{string} with password {string} exist", async (name, password) => {
  // Login as admin to be able to create new user
  const response = (await I.sendPostRequest(
    "/auth/token",
    "username=admin&password=secret"
  )).data;

  // Create a new user
  context.response = await createUser(
    { name, password },
    response.access_token
  );
});

async function createUser({ name, role_id = 0, password = "password" }, token) {
  const res = await I.sendPostRequest(
    "/users/",
    {
      name,
      email: name + "@test.com",
      password,
      role_id
    },
    { Authorization: "Bearer " + token }
  );
  context.users[name] = { ...res.data, role_id: res.data.role.oid };
  return res;
}
