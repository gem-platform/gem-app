import Crud from "@/modules/admin/components/Crud.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import VueI18n from "vue-i18n";

Vue.use(Vuetify);
Vue.use(VueI18n);

const i18n = new VueI18n({ silentTranslationWarn: true });

describe("Crud.vue", () => {
  const wrapper = mount(Crud, { i18n });
  const create = wrapper.find({ ref: "create-new" });

  it("sends 'create' event when 'Create New' button clicked", () => {
    create.trigger("click");
    expect(wrapper.emitted().create).toBeTruthy();
  });
});
