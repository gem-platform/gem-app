import ConfirmDialog from "@/modules/admin/components/ConfirmDialog.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("ConfirmDialog.vue", () => {
  function getContext() {
    const wrapper = mount(ConfirmDialog);
    const root = wrapper.find({ ref: "root" });
    const cancel = wrapper.find({ ref: "cancel" });
    const confirm = wrapper.find({ ref: "confirm" });
    return { wrapper, root, cancel, confirm };
  }

  it("renders props.title when passed", () => {
    const context = getContext();
    const title = "Should I do this?";
    context.wrapper.setProps({ title });
    expect(context.wrapper.html()).toContain(title);
  });

  it("renders props.action when passed", () => {
    const context = getContext();
    const action = "Go ahead";
    context.wrapper.setProps({ action });
    expect(context.wrapper.html()).toContain(action);
  });

  it("show if props.visible == true", () => {
    const context = getContext();
    context.wrapper.setProps({ visible: true });
    expect(context.root.props().value).toBeTruthy();
  });

  it("emits confirm if confirmed", () => {
    const context = getContext();
    context.wrapper.setProps({ visible: true });
    context.confirm.trigger("click");
    expect(context.wrapper.emitted().confirm).toBeTruthy();
  });

  it("emits confirm with data if passed", () => {
    const context = getContext();
    context.wrapper.setProps({ data: 123 });
    context.confirm.trigger("click");
    expect(context.wrapper.emitted().confirm[0][0]).toEqual(123);
  });

  it("emits cancel if canceled", () => {
    const context = getContext();
    context.cancel.trigger("click");
    expect(context.wrapper.emitted().cancel).toBeTruthy();
  });

  it("confirm is disabled if busy", () => {
    const context = getContext();
    context.wrapper.setProps({ busy: true });
    expect(context.confirm.props().disabled).toBeTruthy();
  });

  it("confirm is in loading state if busy", () => {
    const context = getContext();
    context.wrapper.setProps({ busy: true });
    expect(context.confirm.props().loading).toBeTruthy();
  });

  it("cancel is hidden if canCancel is false", () => {
    const context = getContext();
    context.wrapper.setProps({ canCancel: false });
    expect(context.cancel.exists()).toBeFalsy();
  });
});
