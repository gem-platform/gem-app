/// <reference path="../steps.d.ts" />

const I = require("../steps_file")();
const context = require("./_context.js");

Then("I see the error {string}", msg => {
  const message =
    context.response.detail instanceof Array
      ? context.response.detail[0].msg
      : context.response.detail;
  if (msg != message) {
    throw Error("Error: " + message + ". But expected: " + msg);
  }
});
