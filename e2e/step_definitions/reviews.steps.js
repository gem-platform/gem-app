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
      title,
      proposal: proposal.oid,
      start: new Date(),
      end: new Date()
    };

    context.response = await I.sendPostRequest(
      "/reviews/",
      review,
      context.headers
    );

    if (context.response.status === 200) {
      context.reviews[title] = context.response.data;
    }
  }
);

When("I delete the review {string}", title => {
  const review = context.reviews[title];
  if (!review) {
    throw Error("No review found");
  }
  I.sendDeleteRequest("/reviews/" + review.oid, context.headers);
});

Then("Review {string} exists", async title => {
  context.response = await I.sendGetRequest("/reviews/", context.headers);
  if (context.response.status === 200) {
    const reviews = context.response.data.filter(x => x.title == title);
    if (reviews.length <= 0) {
      throw Error("No one review with title '" + title + "' found ");
    }
    if (reviews.length > 1) {
      throw Error("Too many reviews with title '" + title + "' found");
    }
  } else {
    throw Error("Unable to get list of reviews");
  }
});

Then("Review {string} doesn't exist", async title => {
  context.response = await I.sendGetRequest("/reviews/", context.headers);
  if (context.response.status === 200) {
    const reviews = context.response.data.filter(x => x.title == title);
    if (reviews.length > 0) {
      throw Error("Review '" + title + "' still exists");
    }
  } else {
    throw Error("Unable to get list of reviews");
  }
});

When("I set the start date for {string} as {string}", async (title, start) => {
  const review = context.reviews[title];
  if (!review) {
    throw Error("No review found");
  }

  review.start = new Date(start);

  const url = "/reviews/" + review.oid;
  context.response = await I.sendPutRequest(url, review, context.headers);
});

When("I set the end date for {string} as {string}", async (title, end) => {
  const review = context.reviews[title];
  if (!review) {
    throw Error("No review found");
  }

  review.end = new Date(end);

  const url = "/reviews/" + review.oid;
  context.response = await I.sendPutRequest(url, review, context.headers);
});

When("Review {string} for {string} created", async (title, proposalTitle) => {
  const proposal = context.proposals[proposalTitle];
  if (!proposal) {
    throw Error("No proposal found");
  }

  const review = {
    title,
    proposal: proposal.oid,
    start: new Date(),
    end: new Date()
  };

  context.response = await I.sendPostRequest(
    "/reviews/",
    review,
    context.headers
  );

  if (context.response.status === 200) {
    context.reviews[title] = context.response.data;
  } else {
    throw Error("Review is not created");
  }
});

When("Start date for {string} is {string}", (title, date) => {
  const review = context.reviews[title];
  if (!review) {
    throw Error("No review found");
  }
  const actual = new Date(review.start).getTime();
  const expected = new Date(date).getTime();
  if (actual !== expected) {
    throw Error("Start date '" + actual + "' is not equal to " + expected);
  }
});

When("End date for {string} is {string}", (title, date) => {
  const review = context.reviews[title];
  if (!review) {
    throw Error("No review found");
  }
  const actual = new Date(review.end).getTime();
  const expected = new Date(date).getTime();
  if (actual !== expected) {
    throw Error("End date '" + actual + "' is not equal to " + expected);
  }
});
