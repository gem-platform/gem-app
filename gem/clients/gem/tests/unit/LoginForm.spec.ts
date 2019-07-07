import LoginForm from "@/modules/auth/components/LoginForm.vue";
import { mount } from "@vue/test-utils";
import Vue from "vue";
import VueI18n from "vue-i18n";
import Vuetify from "vuetify";

Vue.use(Vuetify);
Vue.use(VueI18n);

describe("LoginForm.vue", () => {
  document.body.setAttribute("data-app", "true");
  const wrapper = mount(LoginForm);
  const submit = wrapper.find({ ref: "submit" });

  it("renders props.message when passed", () => {
    const message = "Wrong login/password pair";
    wrapper.setProps({ message });
    expect(wrapper.html()).toContain(message);
  });

  it("doesn't render props.message if empty", () => {
    const message = "";
    wrapper.setProps({ message });
    expect(wrapper.find({ ref: "alert" }).isVisible()).toBeFalsy();
  });

  it("sends login event when login button clicked", () => {
    wrapper.setData({
      password: "pass",
      username: "admin"
    });
    submit.trigger("click");
    expect(wrapper.emitted().login).toBeTruthy();
    expect(wrapper.emitted().login[0][0]).toEqual({
      password: "pass",
      username: "admin"
    });
  });
});
