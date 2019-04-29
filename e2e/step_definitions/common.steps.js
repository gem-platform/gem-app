/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

Then("I see error {string}", msg => {
  const message = context.response.detail[0].msg;
  if (msg != message) {
    throw Error(message);
  }
});
