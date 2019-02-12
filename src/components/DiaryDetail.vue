<template>
  <div>
    <md-card>
      <md-card-content class="md-layout">
        <md-field class="md-layout-item md-size-75 md-small-size-100">
          <label>Title</label>
          <md-input v-model="pixel.title"></md-input>
        </md-field>
        <md-field class="md-layout-item md-size-100">
          <label>Body</label>
          <md-textarea v-model="pixel.body"></md-textarea>
        </md-field>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-accent" v-if="pixel.quantity" @click="showConfirm=true">Delete</md-button>
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
      pixel: {quantity: '', title: '', body: ''},
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
      async loadDiary() {
        this.pixel = {quantity: '', title: '', body: ''};
        const res = await this.pixela.loadPixel(this.graphId, this.diaryDate);
        this.hasError = !res;
        if (!!res) {
          this.pixel = res;
        } else {
          this.showErrorMessage = true;
        }
      },
      async saveDiary() {
        const res = await this.pixela.postPixel(this.graphId, this.diaryDate, this.pixel);
        if (!res) {
          this.showErrorMessage = true;
        } else {
          this.pixel = res;
          this.showCompleteMessage = true;
        }
      },
      async deleteDiary() {
        const res = await this.pixela.deletePixel(this.graphId, this.diaryDate);
        if (res) {
          this.pixel = {quantity: '', title: '', body: ''};
          this.showCompleteMessage = true;
        } else {
          this.showErrorMessage = true;
        }
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
