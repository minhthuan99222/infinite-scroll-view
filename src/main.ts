import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import { config } from "vuex-module-decorators";
import store from "@/common/stores";
import CommonComponents from "@/common/components/install";

config.rawError = true;

Vue.config.productionTip = false;
Vue.use(CommonComponents);
new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
