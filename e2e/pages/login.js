const I = actor();

module.exports = {
  // setting locators
  fields: {
    username: "username",
    password: "password"
  },
  submitButton: "submit",

  sendForm(username, password) {
    I.fillField(this.fields.username, username);
    I.fillField(this.fields.password, password);
    I.click(this.submitButton);
  }
};
