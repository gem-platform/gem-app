const I = actor();

const editDialog = require("./edit_user_dialog");
const usersTable = require("./admin_users_table");
const changePasswordDialog = require("./change_password_dialog");
const confirmDialog = require("../confirm_dialog");
const snackbar = require("../snackbar");

module.exports = {
  editDialog,
  confirmDialog,
  snackbar,
  usersTable,
  changePasswordDialog,

  createButton: "[data-ref='create-new-user']",

  open() {
    I.amOnPage("/admin/users");
  },

  clickCreateUser() {
    I.click(this.createButton);
    I.waitForVisible(this.editDialog.root);
  },

  createUser(username, waitForClose = true) {
    this.clickCreateUser();
    within(this.editDialog.root, () => {
      this.editDialog.submit(username);
    });
    if (waitForClose) {
      I.waitForInvisible(this.editDialog.root);
    }
  },

  clickConfirmDelete() {
    I.click(this.confirmDelete);
  }
};
