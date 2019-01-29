<template>
  <md-list>
    <GraphListItem v-for="graph in this.$store.state.graphs"
                   :key="graph.id" v-bind:graph="graph"/>
  </md-list>
</template>

<script>
  import Vue from 'vue';
  import {MdList} from 'vue-material/dist/components';
  import GraphListItem from '@/components/GraphListItem.vue';

  Vue.use(MdList);

  export default {
    name: 'GraphList',
    created() {
      if (this.$store.state.graphs.length === 0) {
        this.$router.replace('/');
      }
    },
    components: {
      GraphListItem,
    },
  };
</script>

<style scoped>

</style>
