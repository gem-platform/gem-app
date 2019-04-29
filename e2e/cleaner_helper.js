const axios = require('axios');

class Cleaner extends Helper {

  // before/after hooks
  _before() {
    axios.defaults.baseURL = "http://localhost:9000";
    axios.post("/debug/wipeout", {});
  }

  _after() {
  }
}

module.exports = Cleaner;
