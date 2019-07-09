import LocaleSwitch from "@/modules/auth/components/LocaleSwitch.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import VueI18n from "vue-i18n";
import Vuetify from "vuetify";
// @ts-ignore
import Fragment from "vue-fragment";

Vue.use(Vuetify);
Vue.use(VueI18n);
Vue.use(Fragment.Plugin);

const i18n = new VueI18n({ silentTranslationWarn: true });

describe("LoginForm.vue", () => {
  function getContext() {
    document.body.setAttribute("data-app", "true");
    const wrapper = mount(LocaleSwitch, { i18n, stubs: {Fragment: true} });
    const en = wrapper.find({ ref: "en" });
    const ru = wrapper.find({ ref: "ru" });
    return { en,ru,wrapper };
  }

  it("click en", () => {
    const context = getContext();
    context.en.trigger("click");
    expect(context.wrapper.emitted().localeChanged).toBeTruthy();
    expect(context.wrapper.emitted().localeChanged[0][0]).toEqual("en");
  });

  it("click ru", () => {
    const context = getContext();
    context.ru.trigger("click");
    expect(context.wrapper.emitted().localeChanged).toBeTruthy();
    expect(context.wrapper.emitted().localeChanged[0][0]).toEqual("ru");
  });
});
