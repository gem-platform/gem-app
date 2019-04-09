exports.config = {
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:8080"
    }
  },
  include: {
    I: "./steps_file.js"
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: "./features/*.feature",
    steps: ["./step_definitions/steps.js"]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: "./*_test.js",
  name: "e2e"
};
