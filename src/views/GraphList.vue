<template>
  <md-empty-state v-if="this.$store.state.graphs.length === 0"
                  class="md-accent"
                  md-label="No Graphs." md-icon="notification_important">
    <div class="md-empty-state-description">
      <div>First, create your graph to keep a diary.</div>
      <router-link to="/" class="md-primary">Back</router-link>
    </div>
  </md-empty-state>
  <md-list v-else>
    <GraphListItem v-for="graph in this.$store.state.graphs"
                   :key="graph.id" v-bind:graph="graph"/>
  </md-list>
</template>

<script>
  import Vue from 'vue';
  import {MdList, MdEmptyState} from 'vue-material/dist/components';
  import GraphListItem from '@/components/GraphListItem.vue';

  Vue.use(MdList);
  Vue.use(MdEmptyState);

  export default {
    name: 'GraphList',
    created() {
      if (!this.$store.state.username || !this.$store.state.token) {
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
