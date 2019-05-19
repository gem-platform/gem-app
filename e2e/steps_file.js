// in this file you can append custom step methods to 'I' object
const loginPage = require("./pages/login");

module.exports = function() {
  return actor({
    login: function(username, password) {
      loginPage.sendForm(username, password);
    },

    async loginFast(username, password, navigate = "/") {
      const response = await this.sendPostRequest(
        "/auth/token",
        "username=" + username + "&password=" + password
      );
      var access_token = response.data.access_token;
      this.amOnPage(navigate + "?token=" + access_token);
    },

    wipeout: function(path) {
      const data = require(path);
      this.sendPostRequest("/debug/wipeout", data);
    }
  });
};
