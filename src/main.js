import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import store from "./store/loginStore";

createApp(App).use(createPinia()).use(router).use(store).mount("#app");
