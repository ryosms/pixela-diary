import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  username: string;
  token: string;
}

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
  } as State,
  mutations: {
    setUsername(state: State, newValue: string) {
      state.username = newValue;
    },
    setToken(state: State, newValue: string) {
      state.token = newValue;
    },
  },
  actions: {},
});
