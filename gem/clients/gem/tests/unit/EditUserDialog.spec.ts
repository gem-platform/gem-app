import EditUserDialog from "@/modules/admin/components/EditUserDialog.vue";
import { IUser } from "@/modules/types.ts";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

import { Operation, OperationState } from "@/lib/operations";

Vue.use(Vuetify);

describe("EditUserDialog.vue", () => {
  const user: IUser = {
    disabled: false,
    email: "johndoe@email.com",
    name: "John Doe",
    oid: 1,
    role: { oid: 0, name: "" }
  };

  function getContext() {
    document.body.setAttribute("data-app", "true");
    const wrapper = mount(EditUserDialog, {
      propsData: { user }
    });
    const alert = wrapper.find(".v-alert");
    const name = wrapper.find({ ref: "name" });
    const email = wrapper.find({ ref: "email" });
    const close = wrapper.find("[data-ref='close']");
    const save = wrapper.find("[data-ref='save']");
    return { wrapper, alert, name, email, close, save };
  }

  it("renders props.user when passed", () => {
    const context = getContext();
    expect(context.name.props().value).toEqual(user.name);
    expect(context.email.props().value).toEqual(user.email);
  });

  it("sends close event when close button clicked", () => {
    const context = getContext();
    context.close.trigger("click");
    expect(context.wrapper.props().visible).toEqual(false);
    expect(context.wrapper.emitted().close).toBeTruthy();
  });

  it("sends save event when save button clicked", () => {
    const context = getContext();
    context.save.trigger("click");
    expect(context.wrapper.props().visible).toEqual(false);
    expect(context.wrapper.emitted().save).toBeTruthy();
    expect(context.wrapper.emitted().save[0][0]).toEqual(user);
  });

  it("sends changed entity when save button clicked", () => {
    const changedUser = {
      ...user,
      email: "changedEmail",
      name: "changedName"
    };

    const context = getContext();
    context.name.find("input").setValue("changedName");
    context.email.find("input").setValue("changedEmail");
    context.save.trigger("click");

    expect(context.wrapper.emitted().save[0][0]).toEqual(changedUser);
  });

  it("shows alert if operation is in failed state", () => {
    const context = getContext();
    context.wrapper.setProps({
      operation: new Operation(OperationState.Failed, "Some error")
    });
    expect(context.alert.props().value).toBeTruthy();
    expect(context.alert.text()).toContain("Some error");
  });

  it("doesn't show alert if operation succeeded", () => {
    const context = getContext();
    context.wrapper.setProps({
      operation: new Operation(OperationState.Succeeded, "Success")
    });
    expect(context.alert.props().value).toBeFalsy();
  });
});
