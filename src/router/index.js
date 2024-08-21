import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import ProductDetailView from "../pages/ProductDetailView.vue";
import Login from "../pages/Login.vue";
import Cart from "../pages/Cart.vue";
import CompareList from "../pages/CompareList.vue";
import Wishlist from "../pages/Wishlist.vue";
import Checkout from "../pages/Checkout.vue";
import store from "../store/loginStore"; // Import the store

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
    meta: { requiresAuth: false }, // Public route
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/wishlist",
    name: "Wishlist",
    component: Wishlist,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/compare",
    name: "CompareList",
    component: CompareList,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
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

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }, 
    });
  } else {
    next();
  }
});

export default router;
