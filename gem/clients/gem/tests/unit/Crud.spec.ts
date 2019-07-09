import Crud from "@/modules/admin/components/Crud.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("Crud.vue", () => {
  const wrapper = mount(Crud);
  const create = wrapper.find({ ref: "create-new" });

  it("sends 'create' event when 'Create New' button clicked", () => {
    create.trigger("click");
    expect(wrapper.emitted().create).toBeTruthy();
  });
});
