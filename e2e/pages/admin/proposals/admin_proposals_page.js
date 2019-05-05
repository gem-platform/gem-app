const I = actor();

const editDialog = require("./edit_proposal_dialog");
const proposalsTable = require("./admin_proposals_table");
const confirmDialog = require("../confirm_dialog");
const snackbar = require("../snackbar");

module.exports = {
  editDialog,
  confirmDialog,
  snackbar,
  proposalsTable,

  createButton: "[data-ref='create-new']",

  open() {
    I.amOnPage("/admin/proposals");
  },

  clickCreateProposal() {
    I.click(this.createButton);
    I.waitForVisible(this.editDialog.root);
  },

  createUser(title, waitForClose = true) {
    this.clickCreateProposal();
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
