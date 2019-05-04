/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When("I create the proposal {string}", async title => {
  const res = await I.sendPostRequest("/proposals/", {
    title,
    content: "Proposal content"
  });
  context.proposals[title] = res.data;
});

When("I delete the proposal {string}", title => {
  const proposal = context.proposals[title];
  if (!proposal) {
    throw Error("No proposal found");
  }
  I.sendDeleteRequest("/proposal/" + proposal.oid);
});

Then("Proposal {string} exists", async title => {
  const res = (await I.sendGetRequest("/proposals/")).data;
  const proposals = res.filter(x => x.title == title);
  if (proposals.lenght <= 0) {
    throw Error("No one proposal found");
  }
  if (proposals.lenght > 1) {
    throw Error("Too many proposals found");
  }
});

Then("Proposal {string} doesn't exist", async title => {
  const res = (await I.sendGetRequest("/proposals/")).data;
  const proposals = res.filter(x => x.title == title);
  if (proposals.lenght > 0) {
    throw Error("Proposal still exists");
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
  context.response = (await I.sendPutRequest(
    url,
    proposal,
    context.headers
  )).data;
});

Given("Proposal {string} created", async title => {
  const res = await I.sendPostRequest("/proposals/", {
    title: title,
    content: "Content"
  });
  context.proposals[title] = res.data;
});
