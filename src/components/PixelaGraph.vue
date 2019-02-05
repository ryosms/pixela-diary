<template>
  <div>
    <md-button @click="show" class="md-primary">select date with graph</md-button>

    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Select date</md-dialog-title>
      <md-dialog-content v-if="!!svg" class="md-layout">
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
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css';
  import {Pixela} from '@/pixela';

  Vue.use(MdButton);
  Vue.use(MdDialog);

  export default {
    name: 'PixelaGraph',
    props: {
      diaryDate: Date,
      username: String,
      graphId: String,
    },
    computed: {
      canSelect() {
        return !this.selectedDate;
      },
    },
    data: () => ({
      selectedDate: null,
      graphDate: new Date(),
      svg: '',
      showDialog: false,
      pixela: null,
    }),
    created() {
      this.pixela = new Pixela(this.username, null);
    },
    methods: {
      show() {
        this.selectedDate = null;
        this.showDialog = true;
        this.graphDate = new Date(Date.now());
        this.loadSvg();
      },
      loadSvg() {
        this.pixela.loadGraphSvg(this.graphId, this.graphDate).then((svg) => {
          this.svg = svg;
        }).then(() => {
          if (!!this.svg) {
            this.setPixelEvent();
          }
        });
      },
      setPixelEvent() {
        const pixels = document.querySelectorAll('.each-day');
        tippy(pixels);
        for (const pixel of pixels) {
          pixel.addEventListener('click', (event) => this.pixelClicked(event.target));
        }
      },
      pixelClicked(pixel) {
        this.clearActiveClass();
        this.selectedDate = new Date(Date.parse(pixel.dataset.date));
        pixel.classList.add('active');
      },
      clearActiveClass() {
        const pixels = document.querySelectorAll('.each-day.active');
        for (const pixel of pixels) {
          pixel.classList.remove('active');
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
