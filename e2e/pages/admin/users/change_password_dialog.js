const I = actor();

module.exports = {
  root: "[data-ref='change-password-dialog']",
  fields: {
    password: "[aria-label='New Password']"
  },
  buttons: {
    confirm: "[data-ref='confirm']",
    cancel: "[data-ref='cancel']"
  },
  alert: ".v-alert",

  submit(password) {
    within(this.root, () => {
      I.fillField(this.fields.password, password);
      I.click(this.buttons.confirm);
    });
  },

  clickCancel() {
    within(this.root, () => {
      I.click(this.buttons.cancel);
    });
  },

  waitForOpen() {
    I.waitForVisible(this.root);
  },

  waitForClose() {
    I.waitForInvisible(this.root);
  }
};
