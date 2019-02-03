import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface State {
  username: string;
  token: string;
  graphs: object[];
  graph: any;
}

export default new Vuex.Store({
  state: {
    username: '',
    token: '',
    graphs: [],
    graph: null,
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
    setGraph(state: State, graph: any) {
      state.graph = graph;
    },
  },
  actions: {},
});
