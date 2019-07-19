import ConfirmDialog from "@/modules/admin/components/ConfirmDialog.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";

Vue.use(Vuetify);
Vue.use(VueI18n);

const i18n = new VueI18n({ silentTranslationWarn: true });

describe("ConfirmDialog.vue", () => {
  function getContext() {
    document.body.setAttribute("data-app", "true");
    const wrapper = mount(ConfirmDialog, { i18n });
    return {
      cancel: wrapper.find({ ref: "cancel" }),
      card: wrapper.find({ ref: "card" }),
      confirm: wrapper.find({ ref: "confirm" }),
      dialog: wrapper.find({ ref: "dialog" }),
      wrapper
    };
  }

  it("renders props.title when passed", () => {
    const context = getContext();
    const title = "Should I do this?";
    context.wrapper.setProps({ title });
    expect(context.card.html()).toContain(title);
  });

  it("renders props.action when passed", () => {
    const context = getContext();
    const action = "Go ahead";
    context.wrapper.setProps({ action });
    expect(context.confirm.html()).toContain(action);
  });

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

  it("emits confirm event with data", () => {
    const context = getContext();
    context.wrapper.setProps({ data: 123 });
    context.confirm.trigger("click");
    expect(context.wrapper.emitted().confirm[0][0]).toEqual(123);
  });

  it("emits cancel event if cancel button clicked", () => {
    const context = getContext();
    context.cancel.trigger("click");
    expect(context.wrapper.emitted().cancel).toBeTruthy();
  });

  it("confirm button is disabled if busy is true", () => {
    const context = getContext();
    context.wrapper.setProps({ busy: true });
    expect(context.confirm.props().disabled).toBeTruthy();
  });

  it("confirm button is in loading state if busy is true", () => {
    const context = getContext();
    context.wrapper.setProps({ busy: true });
    expect(context.confirm.props().loading).toBeTruthy();
  });

  it("cancel button is hidden if canCancel is false", () => {
    const context = getContext();
    context.wrapper.setProps({ canCancel: false });
    expect(context.cancel.exists()).toBeFalsy();
  });
});
