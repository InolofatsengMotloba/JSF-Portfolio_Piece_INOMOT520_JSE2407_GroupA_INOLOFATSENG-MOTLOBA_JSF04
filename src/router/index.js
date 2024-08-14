import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import ProductDetailView from "../pages/ProductDetailView.vue";
import Login from "../pages/Login.vue";
import Cart from "../pages/Cart.vue";
import CompareList from "../pages/CompareList.vue";
import Wishlist from "../pages/Wishlist.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/products/:id",
    name: "ProductDetailView",
    component: ProductDetailView,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
  },
  {
    path: "/compare",
    name: "CompareList",
    component: CompareList,
  },
];

/**
 * Creates and configures the Vue Router instance
 * 
 * @type {import("vue-router").Router}
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
