const I = actor();

module.exports = {
  root: "[data-ref='edit-dialog']",
  fields: {
    title: "[aria-label='Title']",
    content: "[aria-label='Content']"
  },
  buttons: {
    save: "[data-ref='save']",
    lock: "[data-ref='lock']"
  },

  submit(title) {
    I.fillField(this.fields.title, title);
    I.click(this.buttons.save);
  },

  lock() {
    I.wait(1);
    within(this.root, () => {
      I.click(this.buttons.lock);
    });
  }
};
