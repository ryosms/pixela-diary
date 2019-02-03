<template>
  <div>
    <md-list-item @click="goEditPage">
      <div class="md-list-item-text">
        {{ graph.name }}
      </div>
    </md-list-item>
    <md-divider></md-divider>
  </div>
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
      goEditPage() {
        this.$store.commit('setGraph', this.graph);
        this.$router.push({name: 'diary'});
      },
    },
  };
</script>

<style scoped>
</style>
