const I = actor();

module.exports = {
  root: "[data-ref='snackbar']",

  contains(message) {
    within(this.root, () => {
      I.see(message);
    });
  }
};
