<template>
  <div>
    <md-card>
      <md-card-content class="md-layout">
        <md-field class="md-layout-item md-size-75 md-small-size-100">
          <label>Title</label>
          <md-input v-model="title"></md-input>
        </md-field>
        <md-field class="md-layout-item md-size-100">
          <label>Body</label>
          <md-textarea v-model="body"></md-textarea>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-accent" v-if="quantity" @click="showConfirm=true">Delete</md-button>
        <md-button class="md-primary" :disabled="!canEdit" @click="saveDiary">Save</md-button>
      </md-card-actions>
    </md-card>

    <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showErrorMessage">
      <span>Something went wrong...</span>
    </md-snackbar>
    <md-snackbar md-position="center" :md-duration="3000" :md-active.sync="showCompleteMessage">
      <span>Completed!</span>
    </md-snackbar>

    <md-dialog-confirm
        :md-active.sync="showConfirm"
        md-title="Are you sure?"
        md-content="Do you want to delete diary?"
        md-confirm-text="Delete!"
        md-cancel-text="Cancel"
        @md-confirm="deleteDiary"/>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdCard, MdField, MdButton, MdSnackbar, MdDialogConfirm} from 'vue-material/dist/components';
  import axios from 'axios';
  import {Pixela} from '@/pixela';

  Vue.use(MdCard);
  Vue.use(MdField);
  Vue.use(MdButton);
  Vue.use(MdSnackbar);
  Vue.use(MdDialogConfirm);

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
          // setter is unnecessary, but add to calm down linter
        },
      },
    },
    data: () => ({
      quantity: '',
      title: '',
      body: '',
      hasError: false,
      showErrorMessage: false,
      showCompleteMessage: false,
      showConfirm: false,
      pixela: null,
    }),
    created() {
      this.pixela = new Pixela(this.username, this.token);
      this.loadDiary();
    },
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
          + ('0' + (diaryDate.getMonth() + 1)).slice(-2)
          + ('0' + diaryDate.getDate()).slice(-2);
      },
      async loadDiary() {
        this.quantity = '';
        this.title = '';
        this.body = '';
        const res = await this.pixela.loadPixel(this.graphId, this.diaryDate);
        // FIXME: in case of 404, pixela don't return CORS headers.
        // this.hasError = !res;
        if (!!res) {
          this.quantity = res.quantity;
          this.title = res.title;
          this.body = res.body;
        }
      },
      saveDiary() {
        const diary = this.quantity ? this.quantity : '1';
        const optionalData = {title: this.title, body: this.body};
        const url = 'https://pixe.la/v1/users/' + this.username
          + '/graphs/' + this.graphId + '/' + this.formatDiaryDate(this.diaryDate);
        const headers = {
          'X-USER-TOKEN': this.token,
        };
        axios.put(url, {quantity: diary, optionalData: JSON.stringify(optionalData)}, {headers})
          .then((ignore) => {
            this.quantity = diary;
            this.showCompleteMessage = true;
          })
          .catch((ignore) => {
            this.showErrorMessage = true;
          });
      },
      deleteDiary() {
        const url = 'https://pixe.la/v1/users/' + this.username
          + '/graphs/' + this.graphId + '/' + this.formatDiaryDate(this.diaryDate);
        const headers = {
          'X-USER-TOKEN': this.token,
        };
        axios.delete(url, {headers}).then((ignore) => {
          this.quantity = '';
          this.title = '';
          this.body = '';
          this.showCompleteMessage = true;
        })
          .catch((ignore) => {
            this.showErrorMessage = true;
          });
      },
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
