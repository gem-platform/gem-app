exports.config = {
  output: "./output",
  helpers: {
    Puppeteer: {
      url: "http://localhost:8080"
    },
    REST: {
      endpoint: "http://localhost:9000",
      defaultHeaders: {
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
    features: "./features/**/*.feature",
    steps: [
      "./step_definitions/authentication.steps.js",
      "./step_definitions/users.steps.js"
    ]
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    }
  },
  tests: "./*_test.js",
  name: "e2e"
};
