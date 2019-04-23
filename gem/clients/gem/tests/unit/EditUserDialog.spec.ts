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
    full_name: "John Doe",
    oid: 1,
    username: "johndoe"
  };
  const wrapper = mount(EditUserDialog, {
    propsData: { user }
  });
  const alert = wrapper.find(".v-alert");
  const name = wrapper.find({ ref: "name" });
  const email = wrapper.find({ ref: "email" });
  const close = wrapper.find("[data-ref='close']");
  const save = wrapper.find("[data-ref='save-user']");

  it("renders props.user when passed", () => {
    expect(name.props().value).toEqual(user.full_name);
    expect(email.props().value).toEqual(user.email);
  });

  it("sends close event when close button clicked", () => {
    close.trigger("click");
    expect(wrapper.props().visible).toEqual(false);
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("sends save event when save button clicked", () => {
    save.trigger("click");
    expect(wrapper.props().visible).toEqual(false);
    expect(wrapper.emitted().save).toBeTruthy();
    expect(wrapper.emitted().save[0][0]).toEqual(user);
  });

  it("sends changed entity when save button clicked", () => {
    const changedUser = {
      ...user,
      email: "changedEmail",
      full_name: "changedName"
    };

    name.find("input").setValue("changedName");
    email.find("input").setValue("changedEmail");
    save.trigger("click");

    expect(wrapper.emitted().save[0][0]).toEqual(changedUser);
  });

  it("shows alert if operation is in failed state", () => {
    wrapper.setProps({
      operation: new Operation(OperationState.Failed, "Some error")
    });
    expect(alert.props().value).toBeTruthy();
    expect(alert.text()).toContain("Some error");
  });

  it("doesn't show alert if operation succeeded", () => {
    wrapper.setProps({
      operation: new Operation(OperationState.Succeeded, "Success")
    });
    expect(alert.props().value).toBeFalsy();
  });
});
