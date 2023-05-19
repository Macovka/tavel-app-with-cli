import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AppLink from "./components/AppLink.vue";
import BaseButton from "./components/BaseButton.vue";

const app = createApp(App);
app.component('AppLink', AppLink);
app.component('BaseButton', BaseButton);
app.use(router);
app.mount("#app");
