/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I create the law {string}", async title => {
  const law = { title, content: "Law content" };
  context.response = await I.sendPostRequest(
    "/laws/",
    law,
    context.headers
  );

  if (context.response.status === 200) {
    context.laws[title] = context.response.data;
  }
});

When("I delete the law {string}", title => {
  const law = context.laws[title];
  if (!law) {
    throw Error("No law found");
  }
  I.sendDeleteRequest("/laws/" + law.oid, context.headers);
});

Then("Law {string} exists", async title => {
  context.response = await I.sendGetRequest("/laws/", context.headers);
  if (context.response.status === 200) {
    const laws = context.response.data.filter(x => x.title == title);
    if (laws.length <= 0) {
      throw Error("No one law with title '" + title + "' found ");
    }
    if (laws.length > 1) {
      throw Error("Too many laws with title '" + title + "' found");
    }
  } else {
    throw Error("Unable to get list of laws");
  }
});

Then("Law {string} doesn't exist", async title => {
  context.response = await I.sendGetRequest("/laws/", context.headers);
  if (context.response.status === 200) {
    const laws = context.response.data.filter(x => x.title === title);
    if (laws.length > 0) {
      throw Error("Law '" + title + "' still exists");
    }
  } else {
    throw Error("Unable to get list of laws");
  }
});

/** Set name for specified user */
When("I set a title for {string} as {string}", async (title, newTitle) => {
  const law = context.laws[title];
  if (!law) {
    throw Error("No law found");
  }

  law.title = newTitle;

  const url = "/laws/" + law.oid;
  context.response = await I.sendPutRequest(url, law, context.headers);
});

Given("Law {string} created", async title => {
  const law = { title, content: "Law content" };
  context.response = await I.sendPostRequest(
    "/laws/",
    law,
    context.headers
  );
  if (context.response.status === 200) {
    context.laws[title] = context.response.data;
  } else {
    throw Error("Unable to create law");
  }
});

/** Lock law for modification */
When("I lock law {string} for modification", async title => {
  const law = context.laws[title];
  if (!law) {
    throw Error("No law found");
  }

  const url = "/laws/" + law.oid + "/lock";
  context.response = await I.sendPostRequest(url, {}, context.headers);
});

/** Check law is locked */
When("Law {string} is locked", async title => {
  const law = context.laws[title];
  if (!law) {
    throw Error("No law found");
  }

  const url = "/laws/" + law.oid;
  context.response = await I.sendGetRequest(url, context.headers);

  if (!context.response.data.locked) {
    throw Error("Law " + title + " is not locked");
  }
});
