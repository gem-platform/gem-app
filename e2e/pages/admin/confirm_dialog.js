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
    I.click(this.buttons.confirm);
  },

  cancel() {
    I.click(this.buttons.cancel);
  }
};
