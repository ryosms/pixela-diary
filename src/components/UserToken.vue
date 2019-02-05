<template>
  <form novalidate class="md-layout md-alignment-center" @submit.prevent="authentication">
    <md-progress-bar md-mode="indeterminate" v-if="isLoading"></md-progress-bar>
    <md-card class="md-layout-item md-size-50 md-small-size-100">
      <md-card-content>
        <md-field class="md-layout-item md-small-size-100">
          <label>Username</label>
          <md-input v-model="username"></md-input>
        </md-field>
        <md-field class="md-layout-item md-small-size-100">
          <label>Token</label>
          <md-input v-model="token" type="password"></md-input>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class=" md-primary" @click="authentication">Submit</md-button>
      </md-card-actions>
    </md-card>
    <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="hasError">
      <span class="md-accent">Something went wrong...</span>
      <md-button class="md-accent" @click="hasError = false">OK</md-button>
    </md-snackbar>

  </form>
</template>

<script>
  import Vue from 'vue';
  import {MdField, MdButton, MdSnackbar, MdProgress, MdCard} from 'vue-material/dist/components';
  import {Pixela} from '@/pixela';

  Vue.use(MdField);
  Vue.use(MdButton);
  Vue.use(MdSnackbar);
  Vue.use(MdProgress);
  Vue.use(MdCard);

  export default {
    name: 'UserToken',
    data: () => ({
      hasError: false,
      isLoading: false,
      pixela: new Pixela(),
    }),
    computed: {
      username: {
        get() {
          return this.$store.state.username;
        },
        set(value) {
          this.$store.commit('setUsername', value);
        },
      },
      token: {
        get() {
          return this.$store.state.token;
        },
        set(value) {
          this.$store.commit('setToken', value);
        },
      },
    },
    methods: {
      authentication() {
        this.isLoading = true;
        const graphs = Pixela.loadGraphs(this.username, this.token);
        this.hasError = !!graphs;
        this.isLoading = false;
        if (graphs) {
          this.$store.commit('setGraphs', graphs);
          this.$router.push('/graphs');
        }
      },
    },
  };
</script>
