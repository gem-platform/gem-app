import EditLawDialog from "@/modules/admin/components/EditLawDialog.vue";
import { ILaw } from "@/modules/types.ts";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

import { Operation, OperationState } from "@/lib/operations";

Vue.use(Vuetify);

describe("EditLawDialog.vue", () => {
  const law: ILaw = {
    content: "content",
    oid: 1,
    title: "Law"
  };

  function getContext() {
    document.body.setAttribute("data-app", "true");
    const wrapper = mount(EditLawDialog, {
      propsData: { law },
      stubs: {
        ckeditor: "<div class='stub'>CKEditor stub</div>"
      }
    });
    const alert = wrapper.find(".v-alert");
    const title = wrapper.find({ ref: "title" });
    const content = wrapper.find({ ref: "content" });
    const close = wrapper.find("[data-ref='close']");
    const save = wrapper.find("[data-ref='save']");
    return { wrapper, alert, title, content, close, save };
  }

  it("renders props.law when passed", () => {
    const context = getContext();
    expect(context.title.props().value).toEqual(law.title);
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
    expect(context.wrapper.emitted().save[0][0]).toEqual(law);
  });

  it("sends changed entity when save button clicked", () => {
    const changedLaw = {
      ...law,
      title: "changed title"
    };

    const context = getContext();
    context.title.find("input").setValue(changedLaw.title);
    context.save.trigger("click");

    expect(context.wrapper.emitted().save[0][0]).toEqual(changedLaw);
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
