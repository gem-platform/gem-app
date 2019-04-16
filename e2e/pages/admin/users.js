const I = actor();

module.exports = {
  usersTable: "[data-ref='users-table']",
  createButton: "[data-ref='create-new-user']",
  editDialog: "[data-ref='edit-user-dialog']",
  nameInput: "[aria-label='Name']",
  saveUserButton: "[data-ref='save-user']",
  snackbar: "[data-ref='snackbar']",

  navigateEditDialog() {
    I.amOnPage("/admin/users");
    I.click(this.createButton);
    I.waitForVisible(this.editDialog);
  },

  submitDialog(name) {
    I.fillField(this.nameInput, name);
    I.click(this.saveUserButton);
  }
};
