/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

async function getEvent(title) {
  var event = context.events[title];
  if (!event) {
    throw Error("No event found");
  }

  const response = await I.sendGetRequest(
    "/events/" + event.oid,
    context.headers
  );
  if (response.status === 200) {
    context.events[event.oid] = event = response.data;
  } else {
    throw Error("Unable to reload event: " + title);
  }

  return event;
}

When("I delete the event {string}", title => {
  const event = context.events[title];
  if (!event) {
    throw Error("No event found");
  }
  I.sendDeleteRequest("/events/" + event.oid, context.headers);
});

Then("Event {string} exists", async title => {
  context.response = await I.sendGetRequest("/events/", context.headers);
  if (context.response.status === 200) {
    const events = context.response.data.filter(x => x.title == title);
    if (events.length <= 0) {
      throw Error("No one event with title '" + title + "' found ");
    }
    if (events.length > 1) {
      throw Error("Too many events with title '" + title + "' found");
    }
  } else {
    throw Error("Unable to get list of events");
  }
});

Then("Event {string} doesn't exist", async title => {
  context.response = await I.sendGetRequest("/events/", context.headers);
  if (context.response.status === 200) {
    const events = context.response.data.filter(x => x.title == title);
    if (events.length > 0) {
      throw Error("Event '" + title + "' still exists");
    }
  } else {
    throw Error("Unable to get list of events");
  }
});

When(
  "I set period for {string} from {string} to {string}",
  async (title, start, end) => {
    const event = context.events[title];
    if (!event) {
      throw Error("No event found");
    }

    event.start = new Date(start);
    event.end = new Date(end);

    const url = "/events/" + event.oid;
    context.response = await I.sendPutRequest(url, event, context.headers);
  }
);

When("I set the start date for {string} as {string}", async (title, start) => {
  const event = context.events[title];
  if (!event) {
    throw Error("No event found");
  }

  event.start = new Date(start);

  const url = "/events/" + event.oid;
  context.response = await I.sendPutRequest(url, event, context.headers);
});

When("I set the end date for {string} as {string}", async (title, end) => {
  const event = context.events[title];
  if (!event) {
    throw Error("No event found");
  }

  event.end = new Date(end);

  const url = "/events/" + event.oid;
  context.response = await I.sendPutRequest(url, event, context.headers);
});

When("Start date for {string} is {string}", async (title, date) => {
  const event = await getEvent(title);
  const actual = new Date(event.start).getTime();
  const expected = new Date(date).getTime();
  if (actual !== expected) {
    throw Error("Start date '" + actual + "' is not equal to " + expected);
  }
});

When("End date for {string} is {string}", async (title, date) => {
  const event = await getEvent(title);
  const actual = new Date(event.end).getTime();
  const expected = new Date(date).getTime();
  if (actual !== expected) {
    throw Error("End date '" + actual + "' is not equal to " + expected);
  }
});
