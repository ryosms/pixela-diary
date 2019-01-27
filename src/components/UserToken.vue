<template>
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
</template>

<script>
  import Vue from 'vue';
  import {MdField, MdButton} from 'vue-material/dist/components';

  Vue.use(MdField);
  Vue.use(MdButton);

  export default {
    name: 'UserToken',
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
        alert(this.username);
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