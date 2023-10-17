import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { config } from "vuex-module-decorators";
import store from "@/common/stores";

config.rawError = true;

Vue.config.productionTip = false;
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
