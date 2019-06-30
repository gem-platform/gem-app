const I = actor();

const editDialog = require("./edit_law_dialog");
const lawsTable = require("./admin_laws_table");
const confirmDialog = require("../confirm_dialog");
const snackbar = require("../snackbar");

module.exports = {
  editDialog,
  confirmDialog,
  snackbar,
  lawsTable,

  createButton: "[data-ref='create-new']",

  open() {
    I.amOnPage("/admin/laws");
  },

  clickCreateLaw() {
    I.click(this.createButton);
    I.waitForVisible(this.editDialog.root);
  },

  createLaw(title, waitForClose = true) {
    this.clickCreateLaw();
    within(this.editDialog.root, () => {
      this.editDialog.submit(title);
    });
    if (waitForClose) {
      I.waitForInvisible(this.editDialog.root);
    }
  },

  clickConfirmDelete() {
    I.click(this.confirmDelete);
  }
};
