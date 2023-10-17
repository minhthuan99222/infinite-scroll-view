import _Vue from "vue";

const CommonComponents = {
  install(Vue: typeof _Vue) {
    Vue.component("FlatButton", () => import("./FlatButton.vue"));
    Vue.component("LoadingWidget", () => import("./LoadingWidget.vue"));
    Vue.component("ErrorWidget", () => import("./ErrorWidget.vue"));
    Vue.component("StatusWidget", () => import("./StatusWidget.vue"));
  },
};
export default CommonComponents;
