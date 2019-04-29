const I = actor();

module.exports = {
  root: "[data-ref='users-table']",
  buttons: {
    delete: "[data-ref='delete-user']",
    edit: "[data-ref='edit-user']"
  },

  clickEdit(name) {
    within(this.root, () => {
      const refByName = "[data-ref-name='" + name + "']";
      I.click(this.buttons.edit + refByName);
    });
  },

  delete(name) {
    const refByName = "[data-ref-name='" + name + "']";
    I.click(this.buttons.delete + refByName);
  },

  waitForDetached(name) {
    const refByName = "[data-ref-name='" + name + "']";
    I.waitForDetached(this.buttons.delete + refByName);
  }
};
