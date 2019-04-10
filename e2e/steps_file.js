// in this file you can append custom step methods to 'I' object

const loginPage = require("./pages/login");

module.exports = function() {
  return actor({
    login: function(username, password) {
      loginPage.sendForm(username, password);
    },
    wipeout: function(path) {
      const data = require(path);
      this.sendPostRequest("/debug/wipeout", data);
    }
  });
};
