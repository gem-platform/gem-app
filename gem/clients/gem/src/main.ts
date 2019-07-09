// @ts-ignore
import CKEditor from "@ckeditor/ckeditor5-vue";
import Vue from "vue";
import App from "./App.vue";
import "./plugins/fragment";
import "./plugins/i18n";
import "./plugins/vuetify";
import router from "./router";
import store from "./store";

import "./plugins/axios";

Vue.config.productionTip = false;

Vue.use(CKEditor);

new Vue({
  i18n: {
    // @ts-ignore
    locale: "en"
  },
  render: h => h(App),
  router,
  store
}).$mount("#app");
