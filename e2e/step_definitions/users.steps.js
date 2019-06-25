/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I create user {string}", async name => {
  context.response = await createUser({ name }, context.token);
});

When("I delete user {string}", name => {
  I.sendDeleteRequest("/users/" + getUser(name).oid, context.headers);
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
  const url = "/users/" + getUser(name).oid + "/changePassword";
  context.response = await I.sendPutRequest(url, { password }, context.headers);
});

When("I set a name for {string} as {string}", async (name, newName) => {
  const user = getUser(name);
  user.name = newName;
  const url = "/users/" + user.oid;
  context.response = (await I.sendPutRequest(url, user, context.headers)).data;
});

When("I set a role for {string} as {string}", async (name, role) => {
  const user = getUser(name);
  user.role_id = getRoleIdByName(role);
  const url = "/users/" + user.oid;
  context.response = await I.sendPutRequest(url, user, context.headers);
});

Then("Role of a {string} is {string}", async (name, role) => {
  const user = getUser(name);
  const res = (await I.sendGetRequest("/users/" + user.oid, context.headers))
    .data;
  if (res.role.name !== role) {
    throw Error("Role should be " + role + " but " + res.role.name);
  }
});

Given("{string} with password {string} exist", async (name, password) => {
  context.response = await createUser(
    { name, password },
    await getAdminToken()
  );
});

function getUser(name) {
  const user = context.users[name];
  if (!user) {
    throw Error("No user found");
  }
  return user;
}

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

async function getAdminToken() {
  // get admin token
  const response = (await I.sendPostRequest(
    "/auth/token",
    "username=admin&password=secret"
  )).data;

  // not authenticated
  if (!response.access_token) {
    throw Error("Unable to get admin access token.");
  }

  // return admin token
  return response.access_token;
}

function getRoleIdByName(name) {
  const roles = { Guest: 0, Admin: 1, Secretary: 2, GBC: 3 };
  return roles[name];
}
