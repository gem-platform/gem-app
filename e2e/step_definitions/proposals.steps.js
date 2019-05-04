/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I create the proposal {string}", async title => {
  const proposal = { title, content: "Proposal content" };
  context.response = await I.sendPostRequest(
    "/proposals/",
    proposal,
    context.headers
  );

  if (context.response.status === 200) {
    context.proposals[title] = context.response.data;
  }
});

When("I delete the proposal {string}", title => {
  const proposal = context.proposals[title];
  if (!proposal) {
    throw Error("No proposal found");
  }
  I.sendDeleteRequest("/proposal/" + proposal.oid, context.headers);
});

Then("Proposal {string} exists", async title => {
  context.response = await I.sendGetRequest("/proposals/", context.headers);
  if (context.response.status === 200) {
    const proposals = context.response.data.filter(x => x.title == title);
    if (proposals.lenght <= 0) {
      throw Error("No one proposal with title '" + title + "' found ");
    }
    if (proposals.lenght > 1) {
      throw Error("Too many proposals with title '" + title + "' found");
    }
  } else {
    throw Error("Unable to get list of proposals");
  }
});

Then("Proposal {string} doesn't exist", async title => {
  context.response = await I.sendGetRequest("/proposals/", context.headers);
  if (context.response.status === 200) {
    const proposals = context.response.data.filter(x => x.title == title);
    if (proposals.lenght > 0) {
      throw Error("Proposal '" + title + "' still exists");
    }
  } else {
    throw Error("Unable to get list of proposals");
  }
});

/** Set name for specified user */
When("I set a title for {string} as {string}", async (title, newTitle) => {
  const proposal = context.proposals[title];
  if (!proposal) {
    throw Error("No proposal found");
  }

  proposal.title = newTitle;

  const url = "/propsals/" + proposal.oid;
  context.response = await I.sendPutRequest(url, proposal, context.headers);
});

Given("Proposal {string} created", async title => {
  const proposal = { title, content: "Proposal content" };
  context.response = await I.sendPostRequest(
    "/proposals/",
    proposal,
    context.headers
  );
  if (context.response.status === 200) {
    context.proposals[title] = context.response.data;
  } else {
    throw Error("Unable to create proposal");
  }
});
