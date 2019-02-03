<template>
  <div class="about">
    <h1 class="md-headline">About</h1>
    <span>You can keep diary to your <a href="https://pixe.la" target="_blank">Pixela</a> graphs with this site.</span>

    <h2 class="md-title">User Data</h2>
    <span>All user data are stored at Pixela. This site DON'T store any user data.</span>

    <h2 class="md-title">GA</h2>
    <span>Google Analytics is installed.
      You can optout with <a href="https://tools.google.com/dlpage/gaoptout" target="_blank">this link</a>.
    </span>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdBottomBar} from 'vue-material/dist/components';

  Vue.use(MdBottomBar);

  export default {
    name: 'About',
  };
</script>
