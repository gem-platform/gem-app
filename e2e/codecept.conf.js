exports.config = {
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:8080"
    },
    REST: {
      endpoint: "http://localhost",
      defaultHeaders: {
        Auth: "11111",
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }
  },
  include: {
    I: "./steps_file.js",
    loginPage: "./pages/login.js"
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
