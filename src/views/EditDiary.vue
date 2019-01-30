<template>
  <div v-if="graph">
    <span class="md-title">{{ graph.name }}</span>
    <md-datepicker v-model="diaryDate" md-immediately>
      <label>diary date</label>
    </md-datepicker>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdDatepicker, MdDialog} from 'vue-material/dist/components';

  Vue.use(MdDatepicker);
  Vue.use(MdDialog);

  export default {
    name: 'EditDiary',
    data: () => ({
      graph: null,
      diaryDate: null,
    }),
    async created() {
      if (!this.$store.state.username || !this.$store.state.token) {
        this.$router.replace('/');
        return;
      }
      this.diaryDate = new Date(Date.now());
      for (const i of this.$store.state.graphs.keys()) {
        const g = this.$store.state.graphs[i];
        if (g.id === this.$route.params.graph_id) {
          this.graph = g;
          return;
        }
      }
      this.$router.replace('/graphs');
    },
  };
</script>

<style scoped>

</style>
