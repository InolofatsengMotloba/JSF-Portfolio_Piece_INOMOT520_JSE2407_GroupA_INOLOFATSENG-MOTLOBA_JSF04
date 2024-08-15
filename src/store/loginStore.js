import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      authToken: null,
    };
  },
  mutations: {
    setAuth(state, token) {
      state.authToken = token;
    },
  },
  actions: {},
  getters: {},
});
