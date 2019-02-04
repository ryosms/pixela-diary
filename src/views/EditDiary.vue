<template>
  <div v-if="this.$store.state.graph">
    <span class="md-title">{{ this.$store.state.graph.name }}</span>
    <div class="md-layout">
      <md-datepicker v-model="diaryDate" md-immediately
                     class="md-layout-item md-size-30 md-small-size-100">
        <label>diary date</label>
      </md-datepicker>
      <div class="md-layout-item md-size-50 md-small-100">
        <PixelaGraph v-model="diaryDate"
                     :username="this.$store.state.username"
                     :graphId="this.$store.state.graph.id"/>
      </div>
    </div>
    <DiaryDetail v-bind:diary-date="diaryDate"
                 v-bind:graphId="this.$store.state.graph.id"
                 v-bind:username="this.$store.state.username"
                 v-bind:token="this.$store.state.token"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdDatepicker, MdDialog} from 'vue-material/dist/components';
  import DiaryDetail from '@/components/DiaryDetail';
  import PixelaGraph from '@/components/PixelaGraph';

  Vue.use(MdDatepicker);
  Vue.use(MdDialog);

  export default {
    name: 'EditDiary',
    data: () => ({
      diaryDate: null,
    }),
    created() {
      if (!this.$store.state.username || !this.$store.state.token || !this.$store.state.graph) {
        this.$router.replace('/');
        return;
      }
      this.diaryDate = this.today();
    },
    methods: {
      today() {
        const now = new Date(Date.now());
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      },
    },
    components: {
      DiaryDetail,
      PixelaGraph,
    },
  };
</script>

<style scoped>

</style>
