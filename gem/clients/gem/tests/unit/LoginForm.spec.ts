import { mount } from "@vue/test-utils";
import Vue from "vue";
import Vuetify from "vuetify";
import LoginForm from "@/modules/auth/components/LoginForm.vue";

Vue.use(Vuetify);

describe("LoginForm.vue", () => {
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
      username: "admin",
      password: "pass"
    });
    submit.trigger("click");
    expect(wrapper.emitted().login).toBeTruthy();
    expect(wrapper.emitted().login[0][0]).toEqual({
      username: "admin",
      password: "pass"
    });
  });
});
