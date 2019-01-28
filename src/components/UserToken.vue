<template>
  <div>
    <md-progress-bar md-mode="indeterminate" v-if="isLoading"></md-progress-bar>
    <div class="md-layout md-gutter md-alignment-center-left">
      <md-field class="md-layout-item">
        <label>Username</label>
        <md-input v-model="username"></md-input>
      </md-field>
      <md-field class="md-layout-item">
        <label>Token</label>
        <md-input v-model="token" type="password"></md-input>
      </md-field>
      <md-button class="md-layout-item md-raised" @click="authentication">Submit</md-button>
    </div>
    <md-snackbar md-position="center" :md-duration="Infinity" :md-active.sync="hasError">
      <span class="md-accent">Something went wrong...</span>
      <md-button class="md-accent" @click="hasError = false">OK</md-button>
    </md-snackbar>

  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdField, MdButton, MdSnackbar, MdProgress} from 'vue-material/dist/components';
  import axios from 'axios';

  Vue.use(MdField);
  Vue.use(MdButton);
  Vue.use(MdSnackbar);
  Vue.use(MdProgress);

  export default {
    name: 'UserToken',
    data: () => ({
      hasError: false,
      isLoading: false,
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
      async authentication() {
        this.isLoading = true;
        try {
          const res = await axios.get('https://pixe.la/v1/users/' + this.$store.state.username + '/graphs',
            {headers: {'X-USER-TOKEN': this.$store.state.token}});
          this.$store.commit('setGraphs', res.data.graphs);
          this.hasError = false;
          this.$router.push('/graphs');
        } catch (e) {
          this.hasError = true;
        } finally {
          this.isLoading = false;
        }
      },
    },
  };
</script>

<style scoped>
  .md-layout-item {
    margin-left: 30px;
    margin-right: 30px;
  }
</style>
