/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

When(
  "I create a review {string} for {string}",
  async (title, proposalTitle) => {
    const proposal = context.proposals[proposalTitle];
    if (!proposal) {
      throw Error("Proposal '" + +proposalTitle + "' doesn't exist");
    }

    const review = {
      type: "review",
      title,
      proposals: [proposal.oid],
      start: new Date(),
      end: new Date()
    };

    context.response = await I.sendPostRequest(
      "/events/",
      review,
      context.headers
    );

    if (context.response.status === 200) {
      context.events[title] = context.response.data;
    }
  }
);

When("Review {string} for {string} created", async (title, proposalTitle) => {
  const proposal = context.proposals[proposalTitle];
  if (!proposal) {
    throw Error("No proposal found");
  }

  const review = {
    type: "review",
    title,
    proposals: [proposal.oid],
    start: new Date(),
    end: new Date()
  };

  context.response = await I.sendPostRequest(
    "/events/",
    review,
    context.headers
  );

  if (context.response.status === 200) {
    context.events[title] = context.response.data;
  } else {
    throw Error("Review is not created");
  }
});
