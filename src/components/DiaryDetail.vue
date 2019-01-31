<template>
  <md-card>
    <md-card-content class="md-layout">
      <md-field class="md-layout-item md-size-50 md-small-size-100">
        <label>Title</label>
        <md-input v-model="title"></md-input>
      </md-field>
      <md-field class="md-layout-item md-size-100">
        <label>Body</label>
        <md-textarea v-model="body"></md-textarea>
      </md-field>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-primary" :disabled="!canEdit" @click="saveDiary">Save</md-button>
    </md-card-actions>
  </md-card>
</template>

<script>
  import Vue from 'vue';
  import {MdCard, MdField, MdButton, MdSnackbar, MdProgress} from 'vue-material/dist/components';
  import axios from 'axios';

  Vue.use(MdCard);
  Vue.use(MdField);

  export default {
    name: 'DiaryDetail',
    props: {
      diaryDate: Date,
      username: String,
      graphId: String,
      token: String,
    },
    computed: {
      canEdit: {
        get() {
          return !this.hasError;
        },
        set(ignore) {
        },
      },
    },
    data: () => ({
      title: 'title',
      body: 'body',
      hasError: false,
    }),
    methods: {
      isDateChanged(newDate, oldDate) {
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
      loadDiary() {
        const self = this;
        const url = 'https://pixe.la/v1/users/' + this.username
          + '/graphs/' + this.graphId + '/' + this.formatDiaryDate(this.diaryDate);
        const headers = {
          'X-USER-TOKEN': this.token,
          'accept': 'application/json'
        };
        axios.get(url, {headers: headers})
          .then(function (response) {
            self.hasError = false;
            self.parseOptionalData(response.data.optionalData);
          })
          .catch(error => {
            // FIXME: in case of 404, pixela don't return CORS headers.
            // self.hasError = (!error.response || error.response.status !== 404);
            self.title = '';
            self.body = '';
          });
      },
      parseOptionalData(optionalData) {
        try {
          const json = JSON.parse(optionalData);
          this.title = json.title;
          this.body = json.body;
        } catch (ignore) {
          this.title = '';
          this.body = '';
        }
      },
      saveDiary() {
        const optionalData = {"title": this.title, "body": this.body};
        const url = 'https://pixe.la/v1/users/' + this.username
          + '/graphs/' + this.graphId + '/' + this.formatDiaryDate(this.diaryDate);
        const headers = {
          'X-USER-TOKEN': this.token,
        };
        console.log(JSON.stringify(optionalData));
        try {
          axios.put(url, {"quantity": "1", "optionalData": JSON.stringify(optionalData)}, {headers: headers});
        } catch(error) {
        }
      },
    },
    created() {
      this.loadDiary();
    },
    watch: {
      diaryDate(newDate, oldDate) {
        if (!newDate) {
          this.canEdit = false;
          return;
        }
        this.canEdit = true;
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