import EditProposalDialog from "@/modules/admin/components/EditProposalDialog.vue";
import { IProposal } from "@/modules/types.ts";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

import { Operation, OperationState } from "@/lib/operations";

Vue.use(Vuetify);

describe("EditProposalDialog.vue", () => {
  const proposal: IProposal = {
    content: "content",
    locked: false,
    oid: 1,
    title: "Proposal"
  };

  function getContext() {
    document.body.setAttribute("data-app", "true");
    const wrapper = mount(EditProposalDialog, {
      propsData: { proposal }
    });
    const alert = wrapper.find(".v-alert");
    const lockedAlert = wrapper.find({ ref: "locked-alert" });
    const title = wrapper.find({ ref: "title" });
    const content = wrapper.find({ ref: "content" });
    const close = wrapper.find("[data-ref='close']");
    const save = wrapper.find("[data-ref='save']");
    return { wrapper, alert, title, content, close, save, lockedAlert };
  }

  it("renders props.proposal when passed", () => {
    const context = getContext();
    expect(context.title.props().value).toEqual(proposal.title);
    expect(context.content.props().value).toEqual(proposal.content);
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
    expect(context.wrapper.emitted().save[0][0]).toEqual(proposal);
  });

  it("sends changed entity when save button clicked", () => {
    const changedProposal = {
      ...proposal,
      content: "changed content",
      title: "changed title"
    };

    const context = getContext();
    context.title.find("input").setValue(changedProposal.title);
    context.content.find("input").setValue(changedProposal.content);
    context.save.trigger("click");

    expect(context.wrapper.emitted().save[0][0]).toEqual(changedProposal);
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

  it("save is disabled if proposal is locked", () => {
    const context = getContext();
    context.wrapper.setProps({
      proposal: { ...proposal, locked: true }
    });
    expect(context.save.props().disabled).toBeTruthy();
  });

  it("locked badge is visible if proposal is locked", () => {
    const context = getContext();
    context.wrapper.setProps({
      proposal: { ...proposal, locked: true }
    });
    expect(context.lockedAlert.props().value).toBeTruthy();
  });
});
