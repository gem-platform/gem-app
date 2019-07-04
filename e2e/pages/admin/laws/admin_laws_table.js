const I = actor();

module.exports = {
  root: "[data-ref='laws-table']",
  buttons: {
    delete: "[data-ref='delete-law']",
    edit: "[data-ref='edit-law']"
  },

  clickEdit(title) {
    within(this.root, () => {
      const refByTitle = "[data-ref-title='" + title + "']";
      I.click(this.buttons.edit + refByTitle);
    });
  },

  delete(title) {
    const refByTitle = "[data-ref-title='" + title + "']";
    I.click(this.buttons.delete + refByTitle);
  },

  waitForDetached(title) {
    const refByTitle = "[data-ref-title='" + title + "']";
    I.waitForDetached(this.buttons.delete + refByTitle);
  }
};
