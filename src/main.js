import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import store from "./store/loginStore";
import { useCartStore } from "./store/cartStore";
import { useCompareStore } from "./store/compareStore";

createApp(App).use(createPinia()).use(router).use(store).mount("#app");

// Initialize cart store and set user ID
const cartStore = useCartStore();
cartStore.loadCart();
cartStore.setUserId(store.state.authToken);

// Initialize compare store
const compareStore = useCompareStore();
compareStore.loadCompareList();
