/// <reference path="../steps.d.ts" />

const context = require("./_context.js");

Then("I see the error {string}", msg => {
  const message =
    context.response.data.detail instanceof Array
      ? context.response.data.detail[0].msg
      : context.response.data.detail;
  if (msg != message) {
    console.info("Response: ", context.response.data);
    throw Error("Error: " + message + ". But expected: " + msg);
  }
});
