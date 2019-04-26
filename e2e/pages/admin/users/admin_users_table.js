const I = actor();

module.exports = {
  root: "[data-ref='users-table']",
  buttons: {
    delete: "[data-ref='delete-user']"
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
