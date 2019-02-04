<template>
  <div>
    <md-button @click="show" class="md-primary">select date with graph</md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Select date</md-dialog-title>
      <md-dialog-content class="md-layout">
        <div v-html="svg" class="md-layout-item md-size-100" style="width: 300px; max-width: 300px;"></div>
        <MdButton class="md-layout-item md-primary" @click="changeGraphDate(-30)">
          <md-icon class="md-size-2x">replay_30</md-icon>
        </MdButton>
        <md-button class="md-layout-item md-primary" @click="changeGraphDate(30)">
          <md-icon class="md-size-2x">forward_30</md-icon>
        </md-button>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-accent" @click="showDialog=false">cancel</md-button>
        <md-button class="md-primary" :disabled.sync="canSelect" @click="reportParent">select</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {MdButton, MdDialog} from 'vue-material/dist/components';
  import axios from 'axios';
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';

  Vue.use(MdButton);
  Vue.use(MdDialog);

  export default {
    name: "PixelaGraph",
    props: {
      diaryDate: Date,
      username: String,
      graphId: String,
    },
    computed: {
      canSelect() {
        return !this.selectedDate;
      }
    },
    data: () => ({
      selectedDate: null,
      graphDate: new Date(),
      svg: '',
      showDialog: false,
    }),
    methods: {
      show() {
        this.selectedDate = null;
        this.showDialog = true;
        this.graphDate = new Date(Date.now());
        this.loadSvg();
      },
      loadSvg() {
        const targetDate = this.graphDate.getFullYear()
          + ('0' + (this.graphDate.getMonth() + 1)).slice(-2)
          + ('0' + this.graphDate.getDate()).slice(-2);
        const url = `https://pixe.la/v1/users/${this.username}/graphs/${this.graphId}`;
        const params = {
          'date': targetDate,
          'mode': 'short',
        };
        axios.get(url, {params}).then((response) => {
          this.svg = response.data;
        }).then((ignore) => {
          this.setPixelEvent();
        });
      },
      setPixelEvent() {
        const self = this;
        const pixels = document.querySelectorAll('.each-day');
        tippy(pixels);
        for (let i = 0; i < pixels.length; i++) {
          const pixel = pixels[i];
          pixel.addEventListener('click', function() {
            self.pixelClicked(this);
          });
        }
      },
      pixelClicked(pixel) {
        this.clearActiveClass();
        this.selectedDate = new Date(Date.parse(pixel.dataset.date));
        pixel.classList.add('active');
      },
      clearActiveClass() {
        const pixels = document.querySelectorAll('.each-day.active');
        for (let i = 0; i < pixels.length; i++) {
          pixels[i].classList.remove('active');
        }
      },
      changeGraphDate(days) {
        this.graphDate.setDate(this.graphDate.getDate() + days);
        this.loadSvg();
      },
      reportParent() {
        if (!!this.selectedDate) {
          this.$parent.diaryDate = this.selectedDate;
        }
        this.showDialog = false;
      },
    },
  };
</script>

<style>
  .active {
    outline: -webkit-focus-ring-color auto 3px;
    outline-offset: -2px;
  }
</style>
