import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

axios.interceptors.request.use(
  function(config) {
    const token = store.state["auth/data"].token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
