const I = actor();

module.exports = {
  root: "[data-ref='edit-user-dialog']",
  fields: {
    name: "[aria-label='Name']",
    email: "[aria-label='Email']"
  },
  buttons: {
    save: "[data-ref='save-user']",
    changePassword: "[data-ref='change-password']"
  },

  submit(name) {
    I.fillField(this.fields.name, name);
    I.click(this.buttons.save);
  },

  clickChangePassword() {
    I.wait(1);
    within(this.root, () => {
      I.click(this.buttons.changePassword);
    });
  }
};
