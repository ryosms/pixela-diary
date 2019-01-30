<template>
  <div>
    <span>{{ diaryDate.getFullYear() }}年</span>
    <span>{{ diaryDate.getMonth() + 1 }}月</span>
    <span>{{ diaryDate.getDate() }}日</span>
    <div>{{graphId}}</div>
  </div>
</template>

<script>
  export default {
    name: 'DiaryDetail',
    props: {
      diaryDate: Date,
      username: String,
      graphId: String,
      token: String,
    },
    methods: {
      isDateChanged(newDate, oldDate) {
        if (!newDate) {
          return false;
        }
        if (!oldDate) {
          return true;
        }
        return !(newDate.getFullYear() === oldDate.getFullYear()
          && newDate.getMonth() === oldDate.getMonth()
          && newDate.getDate() === oldDate.getDate());
      },
      formatDiaryDate(diaryDate) {
        return diaryDate.getFullYear()
          + ('0' + diaryDate.getMonth() + 1).slice(-2)
          + ('0' + diaryDate.getDate()).slice(-2);
      },
      async loadDiary() {
        const url = 'https://pixe.la/v1/users/' + this.username
          + '/graphs/' + this.graphId + '/' + this.formatDiaryDate(this.diaryDate);
        console.log(url);
      },
    },
    watch: {
      diaryDate(newDate, oldDate) {
        if (!this.isDateChanged(newDate, oldDate)) {
          return;
        }
        this.loadDiary();
      },
    },
  };
</script>

<style scoped>

</style>
