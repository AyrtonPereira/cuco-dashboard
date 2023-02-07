import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";
import toastPlugin from "./plugins/toastPlugin";
import "vue-toastification/dist/index.css";

import App from "./App.vue";
import router from "./router";

/*import of most used components*/
import BaseButton from "@/components/form/BaseButton.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
/*******************************/

import "./assets/main.css";

const app = createApp(App);
export const pinia = createPinia();
pinia.use(piniaPluginPersistedState).use(({ store }) => {
  store.router = markRaw(router);
});

app
  .use(Toast, {
    toastClassName: "panel-toast",
    transition: "Vue-Toastification__fade",
  })
  .use(toastPlugin)
  .use(pinia)
  .use(router)
  .component("BaseButton", BaseButton)
  .component("BaseInput", BaseInput);

app.mount("#app");
