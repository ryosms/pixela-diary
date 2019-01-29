<template>
  <router-link v-bind:to="{name: 'diary', params: {graph_id: graph.id}}">
    <md-list-item @click="noAction">
      <div class="md-list-item-text">
        {{ graph.name }}
      </div>
    </md-list-item>
    <md-divider></md-divider>
  </router-link>
</template>

<script>
  import Vue from 'vue';
  import {MdList, MdDivider} from 'vue-material/dist/components';

  Vue.use(MdList);
  Vue.use(MdDivider);

  export default {
    name: 'GraphListItem',
    props: ['graph'],
    methods: {
      noAction() {/* empty! */
      },
    },
  };
</script>

<style scoped>
</style>
