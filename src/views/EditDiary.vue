<template>
  <div v-if="graph">
    <span class="md-title">{{ graph.name }}</span>
    <md-datepicker v-model="diaryDate" md-immediately>
      <label>diary date</label>
    </md-datepicker>
    <DiaryDetail v-bind:diary-date="diaryDate"
                 v-bind:graph-id="graph.id"
                 v-bind:username="this.$store.state.username"
                 v-bind:token="this.$store.state.token"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdDatepicker, MdDialog} from 'vue-material/dist/components';
  import DiaryDetail from '@/components/DiaryDetail';

  Vue.use(MdDatepicker);
  Vue.use(MdDialog);

  export default {
    name: 'EditDiary',
    data: () => ({
      graph: null,
      diaryDate: null,
    }),
    created() {
      if (!this.$store.state.username || !this.$store.state.token) {
        this.$router.replace('/');
        return;
      }
      const g = this.findSelectedGraph();
      if (!g) {
        this.$router.replace('/graphs');
        return;
      }
      this.graph = g;
      this.diaryDate = this.today();
    },
    methods: {
      findSelectedGraph() {
        for (const i of this.$store.state.graphs.keys()) {
          const g = this.$store.state.graphs[i];
          if (g.id === this.$route.params.graph_id) {
            return g;
          }
        }
        return null;
      },
      today() {
        const now = new Date(Date.now());
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      },
    },
    components: {
      DiaryDetail,
    },
  };
</script>

<style scoped>

</style>
