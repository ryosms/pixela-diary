import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  username: string;
  token: string;
  graphs: object[];
}

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    graphs: [],
  } as State,
  mutations: {
    setUsername(state: State, newValue: string) {
      state.username = newValue;
    },
    setToken(state: State, newValue: string) {
      state.token = newValue;
    },
    setGraphs(state: State, graphs: object[]) {
      if (graphs == null) {
        state.graphs = [];
      } else {
        state.graphs = graphs;
      }
    },
  },
  actions: {},
});
