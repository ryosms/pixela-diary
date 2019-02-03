<template>
  <div id="app">
    <div class="page-container">
      <md-app md-mode="fixed">
        <md-app-toolbar class="md-primary">
          <span class="md-title"><router-link to="/">Pixela Diary</router-link></span>
          <div class="md-toolbar-section-end">
            <router-link to="/about">About</router-link>
          </div>
        </md-app-toolbar>
        <md-app-content>
          <router-view/>
        </md-app-content>
      </md-app>
    </div>
    <footer class="main-footer">
      &copy;2019 &nbsp;
      <a href="https://twitter.com/ryosms" target="_blank">@ryosms</a>
    </footer>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdApp, MdToolbar, MdContent, MdButton} from 'vue-material/dist/components';

  Vue.use(MdApp);
  Vue.use(MdToolbar);
  Vue.use(MdContent);
  Vue.use(MdButton);

  import 'vue-material/dist/theme/default.css';
  import 'vue-material/dist/vue-material.min.css';

  export default {
    name: 'App',
  };
</script>
<style lang="scss">
  .md-app-toolbar {
    a {
      color: white !important;

      &:hover {
        text-decoration: none;
      }
    }
  }

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }
  .page-container {
    flex-grow: 1
  }

  .main-footer {
    display: flex;
    background-color: #EEE;
    padding: 10px 16px;
    justify-content: center;
  }
</style>
