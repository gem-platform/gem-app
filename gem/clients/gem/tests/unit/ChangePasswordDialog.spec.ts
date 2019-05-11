import ChangePasswordDialog from "@/modules/admin/components/ChangePasswordDialog.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("ChangePasswordDialog.vue", () => {
  function getContext() {
    document.body.setAttribute("data-app", "true");
    const wrapper = mount(ChangePasswordDialog);

    return {
      cancel: wrapper.find({ ref: "cancel" }),
      confirm: wrapper.find({ ref: "confirm" }),
      dialog: wrapper.find({ ref: "dialog" }),
      error: wrapper.find({ ref: "error" }),
      password: wrapper.find({ ref: "password" }),
      wrapper
    };
  }

  it("shows dialog if props.visible is true", () => {
    const context = getContext();
    context.wrapper.setProps({ visible: true });
    expect(context.dialog.props().value).toBeTruthy();
  });

  it("emits confirm event if confirm button clicked", () => {
    const context = getContext();
    context.confirm.trigger("click");
    expect(context.wrapper.emitted().confirm).toBeTruthy();
  });

  it("emits confirm event with new password", () => {
    const context = getContext();
    context.wrapper.setData({ password: "new-password" });
    context.confirm.trigger("click");
    expect(context.wrapper.emitted().confirm[0][0]).toEqual({
      password: "new-password"
    });
  });

  it("emits cancel event if cancel button clicked", () => {
    const context = getContext();
    context.cancel.trigger("click");
    expect(context.wrapper.emitted().cancel).toBeTruthy();
  });

  it("confirm button is disabled if prop.busy is true", () => {
    const context = getContext();
    context.wrapper.setProps({ busy: true });
    expect(context.confirm.props().disabled).toBeTruthy();
  });

  it("confirm button is in loading state if prop.busy is true", () => {
    const context = getContext();
    context.wrapper.setProps({ busy: true });
    expect(context.confirm.props().loading).toBeTruthy();
  });

  it("cancel button is hidden if prop.canCancel is false", () => {
    const context = getContext();
    context.wrapper.setProps({ canCancel: false });
    expect(context.cancel.exists()).toBeFalsy();
  });

  it("shows error message if props.error is set", () => {
    const context = getContext();
    context.wrapper.setProps({ error: "password is to weak" });
    expect(context.error.isVisible()).toBeTruthy();
  });

  it("does not show error message if props.error is not set", () => {
    const context = getContext();
    expect(context.error.isVisible()).toBeFalsy();
  });
});
