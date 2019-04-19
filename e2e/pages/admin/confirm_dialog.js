const I = actor();

module.exports = {
  root: "[data-ref='confirm-dialog']",
  buttons: {
    confirm: "[data-ref='confirm']",
    cancel: "[data-ref='cancel']"
  },

  waitForOpen() {
    I.waitForVisible(this.root);
  },

  confirm() {
    this.waitForOpen();
    within(".v-dialog--active", () => {
      I.click(this.buttons.confirm);
    });
  },

  cancel() {
    within(".v-dialog--active", () => {
      I.click(this.buttons.cancel);
    });
  }
};
