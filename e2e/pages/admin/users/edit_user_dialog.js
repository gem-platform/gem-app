const I = actor();

module.exports = {
  root: "[data-ref='edit-dialog']",
  blocks: {
    name: "[data-ref='name-block']",
    password: "[data-ref='password-block']",
    role: "[data-ref='role-block']"
  },
  fields: {
    name: "[aria-label='Name']",
    password: "[aria-label='Password']",
    email: "[aria-label='Email']"
  },
  buttons: {
    save: "[data-ref='save']",
    changePassword: "[data-ref='change-password']"
  },

  submit({ name, password = "password", role = undefined }) {
    I.fillField(this.fields.name, name);
    I.fillField(this.fields.password, password);

    if (role) {
      within(this.blocks.role, function() {
        I.click(".v-select__slot");
      });
      if (role) {
        I.click(role);
      }
    }

    I.click(this.buttons.save);
  },

  clickChangePassword() {
    I.wait(1);
    within(this.root, () => {
      I.click(this.buttons.changePassword);
    });
  }
};
