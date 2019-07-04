// @ts-ignore
import CKEditor from "@ckeditor/ckeditor5-vue";
import Vue from "vue";
import App from "./App.vue";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

import "./plugins/axios";
import "./plugins/fragment";

Vue.config.productionTip = false;

Vue.use(CKEditor);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");
